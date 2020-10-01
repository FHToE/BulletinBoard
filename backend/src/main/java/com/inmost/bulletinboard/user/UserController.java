package com.inmost.bulletinboard.user;

import com.inmost.bulletinboard.exceptions.SingleMessageResponse;
import com.inmost.bulletinboard.exceptions.ValidationMessageCreator;
import com.inmost.bulletinboard.security.oauth.UserPrincipal;
import com.inmost.bulletinboard.user.dto.UpdateUserRequestDto;
import com.inmost.bulletinboard.user.dto.UserDto;
import com.inmost.bulletinboard.user.dto.UserFullDto;
import com.inmost.bulletinboard.user.model.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/me")
    public UserDto getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userService.findById(userPrincipal.getId());
    }

    @GetMapping("/info")
    public UserFullDto getUserInfo(@CurrentUser UserPrincipal userPrincipal) {
        return userService.getUserInfo(userPrincipal.getId());
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateUser(@CurrentUser UserPrincipal userPrincipal,
                                  @RequestBody UpdateUserRequestDto request, Errors validationResult) {
        if (validationResult.hasErrors()) {
            return ResponseEntity.badRequest()
                    .body(new SingleMessageResponse(
                                    ValidationMessageCreator.createString(validationResult, " ")
                            )
                    );
        }
        return ResponseEntity.ok(userService.updateUser(userPrincipal.getId(), request));
    }
}
