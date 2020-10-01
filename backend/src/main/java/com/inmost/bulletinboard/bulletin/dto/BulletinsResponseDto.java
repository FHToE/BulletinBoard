package com.inmost.bulletinboard.bulletin.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BulletinsResponseDto {
    private int total;
    private List<BulletinDto> bulletins;
}
