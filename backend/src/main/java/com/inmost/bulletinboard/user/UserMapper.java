package com.inmost.bulletinboard.user;

import com.inmost.bulletinboard.user.dto.UserDto;
import com.inmost.bulletinboard.user.dto.UserFullDto;
import com.inmost.bulletinboard.user.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {
    UserMapper MAPPER = Mappers.getMapper(UserMapper.class);

    @Mapping(target="name", expression = "java(user.getFullName())")
    UserDto userToUserDto(User user);

    @Mapping(target="password", expression = "java(new String(\"UserPassword\"))")
    UserFullDto userToUserFullDto(User user);
}
