package com.inmost.bulletinboard.bulletin;

import com.inmost.bulletinboard.bulletin.dto.BulletinCreateRequestDto;
import com.inmost.bulletinboard.bulletin.dto.BulletinsResponseDto;
import com.inmost.bulletinboard.security.oauth.UserPrincipal;
import com.inmost.bulletinboard.user.model.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bulletin")
public class BulletinController {
    private final BulletinService bulletinService;

    @Autowired
    public BulletinController(BulletinService bulletinService) {
        this.bulletinService = bulletinService;
    }

    @GetMapping("/{from}")
    private BulletinsResponseDto getBulletins(@PathVariable("from") int from) {
        return bulletinService.getBulletins(from);
    }

    @PostMapping("/create")
    private boolean createBulletin(@CurrentUser UserPrincipal userPrincipal, @RequestBody BulletinCreateRequestDto request) {
        return bulletinService.createBulletin(userPrincipal.getId(), request);
    }
}
