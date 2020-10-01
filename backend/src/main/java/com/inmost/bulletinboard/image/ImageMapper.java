package com.inmost.bulletinboard.image;

import com.inmost.bulletinboard.image.dto.ImageDto;
import com.inmost.bulletinboard.image.model.Image;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ImageMapper {
    ImageMapper MAPPER = Mappers.getMapper(ImageMapper.class);

    ImageDto imageToImageDto(Image image);
}
