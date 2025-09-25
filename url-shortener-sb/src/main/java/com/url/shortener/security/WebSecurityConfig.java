package com.url.shortener.security;

import com.url.shortener.security.jwt.JwtAuthenticationFilter;
import com.url.shortener.service.UserDetailsServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.authentication.configurers.userdetails.DaoAuthenticationConfigurer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// Main class to control the overall flow of security
@Configuration // Marks this class as a configuration class for Spring Security
@EnableWebSecurity // Enables Spring Security for the entire app
@EnableMethodSecurity // Allows using method-level security annotations like @PreAuthorize
@AllArgsConstructor // Lombok: generates a constructor for required fields
public class WebSecurityConfig {

    // Injects our custom UserDetailsService implementation
    private UserDetailsServiceImpl userDetailsService;

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        // Registers the JWT filter so it can be added to the security chain
        return new JwtAuthenticationFilter();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        // Using BCrypt for secure password hashing and verification
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        // DAO provider connects Spring Security with our DB using UserDetailsService
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService); // Uses our custom service to fetch users
        authProvider.setPasswordEncoder(passwordEncoder()); // Uses BCrypt to validate passwords
        return authProvider;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable) // Disable CSRF since JWT is stateless
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers("/api/auth/public/**").permitAll()
                        // Public endpoints (signup/login)
                        .requestMatchers("/api/auth/**").permitAll()
                        // Protected endpoints - require JWT authentication
                        .requestMatchers("/api/urls/**").authenticated()
                        // Shortened URLs should be accessible without login
                        .requestMatchers("/{shortUrl}").permitAll()
                        // Any other request must be authenticated
                        .anyRequest().authenticated()
                );

        // Register our custom authentication provider
        http.authenticationProvider(authenticationProvider());

        // Add our JWT filter before Spring's UsernamePasswordAuthenticationFilter
        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        // Build the configured security filter chain
        return http.build();
    }
}

