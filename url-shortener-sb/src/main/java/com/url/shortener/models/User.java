package com.url.shortener.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class User {
//Main user table holding the username and password that will help them login
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    @Column(unique = true, nullable = false)
    private String username;

    private String password;

    private String role = "ROLE_USER";

}
