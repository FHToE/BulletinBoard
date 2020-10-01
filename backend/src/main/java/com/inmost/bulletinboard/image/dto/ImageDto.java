package com.inmost.bulletinboard.image.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class ImageDto {
    private UUID id;
    private String link;
}
