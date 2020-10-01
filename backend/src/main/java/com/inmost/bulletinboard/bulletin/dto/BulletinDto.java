package com.inmost.bulletinboard.bulletin.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BulletinDto {
    private UUID id;
    private String name;
    private String text;
    private Date date;
    private String author;
    private String image;
}
