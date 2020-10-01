package com.inmost.bulletinboard.bulletin;

import com.inmost.bulletinboard.bulletin.dto.BulletinCreateRequestDto;
import com.inmost.bulletinboard.bulletin.dto.BulletinDto;
import com.inmost.bulletinboard.bulletin.dto.BulletinsResponseDto;
import com.inmost.bulletinboard.bulletin.model.Bulletin;
import com.inmost.bulletinboard.exceptions.ResourceNotFoundException;
import com.inmost.bulletinboard.image.ImageRepository;
import com.inmost.bulletinboard.image.model.Image;
import com.inmost.bulletinboard.user.UserRepository;
import com.inmost.bulletinboard.user.UserService;
import com.inmost.bulletinboard.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BulletinService {
    private final BulletinRepository bulletinRepository;
    private final UserRepository userRepository;
    private final ImageRepository imageRepository;

    @Autowired
    public BulletinService(BulletinRepository bulletinRepository, UserRepository userRepository, ImageRepository imageRepository) {
        this.bulletinRepository = bulletinRepository;
        this.userRepository = userRepository;
        this.imageRepository = imageRepository;
    }

    public BulletinsResponseDto getBulletins(int from) {
        Page<Bulletin> bulletins = bulletinRepository
                .findAll(PageRequest.of(from, 10, Sort.by(Sort.Direction.DESC, "createdAt")));
        List<BulletinDto> bulletinDtoList = bulletins.map(BulletinMapper.MAPPER::bulletinToBulletinDto).toList();
        BulletinsResponseDto result = BulletinsResponseDto.builder().bulletins(bulletinDtoList)
                .total((int) bulletinRepository.count()).build();
        return result;
    }

    public boolean createBulletin(UUID userId, BulletinCreateRequestDto request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        Image image;
        if (request.getImageId() != null) {
            image = imageRepository.findById(request.getImageId())
                    .orElseThrow(() -> new ResourceNotFoundException("Image", "id", request.getImageId()));
        } else {
            image = null;
        }
        Bulletin bulletin = Bulletin.builder().user(user).text(request.getText()).name(request.getName())
                .image(image).build();
        bulletinRepository.save(bulletin);
        return true;
    }
}
