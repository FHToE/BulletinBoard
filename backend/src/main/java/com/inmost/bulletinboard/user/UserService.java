package com.inmost.bulletinboard.user;

import com.inmost.bulletinboard.auth.AuthService;
import com.inmost.bulletinboard.exceptions.ResourceNotFoundException;
import com.inmost.bulletinboard.exceptions.UserAlreadyRegisteredException;
import com.inmost.bulletinboard.security.oauth.UserPrincipal;
import com.inmost.bulletinboard.user.dto.UpdateUserRequestDto;
import com.inmost.bulletinboard.user.dto.UserDto;
import com.inmost.bulletinboard.user.dto.UserFullDto;
import com.inmost.bulletinboard.user.model.CurrentUser;
import com.inmost.bulletinboard.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthService authService;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with email : " + email));
        return UserPrincipal.create(user);
    }

    @Transactional
    public UserDetails loadUserById(UUID id) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", id)
        );

        return UserPrincipal.create(user);
    }

    public UserDto findById(UUID id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        UserDto userDto = UserMapper.MAPPER.userToUserDto(user);
        return userDto;
    }

    public UserFullDto getUserInfo(UUID id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        UserFullDto userDto = UserMapper.MAPPER.userToUserFullDto(user);
        return userDto;
    }

    public UserFullDto updateUser(UUID id, UpdateUserRequestDto request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        if (userRepository.findByEmail(request.getEmail()).isPresent()
                && !userRepository.findByEmail(request.getEmail()).get().getId().equals(id)) {
            throw new UserAlreadyRegisteredException(
                    "User with email '" + request.getEmail() + "' is already registered."
            );
        }
        user.setLastName(request.getLastName());
        user.setFirstName(request.getFirstName());
        user.setEmail(request.getEmail());
        if (!request.getPassword().equals("UserPassword") && request.getPassword() != null) {
            user.setPassword(authService.passwordEncoder.encode(request.getPassword()));
        }
        userRepository.save(user);
        UserFullDto userDto = UserMapper.MAPPER.userToUserFullDto(user);
        return userDto;
    }
}
