package com.url.shortener.dtos;

import lombok.Data;

import java.time.LocalDate;

// DTO class for registration
@Data
public class ClickEventDTO {
    private LocalDate clickDate;
    private Long count;
}
