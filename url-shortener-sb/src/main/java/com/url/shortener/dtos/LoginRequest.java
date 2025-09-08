package com.url.shortener.dtos;

import lombok.Data;

import java.util.Set;

// DTO class for registration
@Data
public class LoginRequest {
    private String username;
    private String password;
}
