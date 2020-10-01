package com.inmost.bulletinboard.image;

import com.inmost.bulletinboard.image.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ImageRepository extends JpaRepository<Image, UUID> {
}
