package com.inmost.bulletinboard.bulletin.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class BulletinCreateRequestDto {
    private String name;
    private String text;
    private UUID imageId;
}
