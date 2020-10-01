package com.inmost.bulletinboard.bulletin;

import com.inmost.bulletinboard.bulletin.dto.BulletinDto;
import com.inmost.bulletinboard.bulletin.model.Bulletin;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface BulletinMapper {
    BulletinMapper MAPPER = Mappers.getMapper(BulletinMapper.class);

    @Mapping(source = "createdAt", target = "date")
    @Mapping(target = "author", expression = "java(bulletin.getUser().getFullName())")
    @Mapping(target = "image", expression = "java(bulletin.getImage() != null ? bulletin.getImage().getLink() : \"\")")
    BulletinDto bulletinToBulletinDto(Bulletin bulletin);
}
