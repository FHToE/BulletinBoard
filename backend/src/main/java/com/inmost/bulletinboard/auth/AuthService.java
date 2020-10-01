package com.inmost.bulletinboard.auth;

import com.inmost.bulletinboard.exceptions.UserAlreadyRegisteredException;
import com.inmost.bulletinboard.security.model.AuthResponse;
import com.inmost.bulletinboard.security.model.LoginRequest;
import com.inmost.bulletinboard.security.model.RefreshTokenResponse;
import com.inmost.bulletinboard.security.model.SignUpRequest;
import com.inmost.bulletinboard.security.oauth.TokenProvider;
import com.inmost.bulletinboard.user.UserRepository;
import com.inmost.bulletinboard.user.UserService;
import com.inmost.bulletinboard.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final AuthenticationManager authenticationManager;

    private final TokenProvider tokenProvider;

    private final UserRepository userRepository;

    private final UserService customUserDetailsService;

    public final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthService(AuthenticationManager authenticationManager, TokenProvider tokenProvider,
                       UserRepository userRepository, UserService customUserDetailsService,
                       PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.userRepository = userRepository;
        this.customUserDetailsService = customUserDetailsService;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponse login(LoginRequest loginRequest) {
        final var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        final var token = tokenProvider.createAccessToken(authentication);
        final var refresh = tokenProvider.createRefreshToken(authentication);
        return new AuthResponse(token, refresh);
    }

    public AuthResponse register(SignUpRequest signUpRequest) throws UserAlreadyRegisteredException {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new UserAlreadyRegisteredException(
                    "User with email '" + signUpRequest.getEmail() + "' is already registered."
            );
        }
        final var user = new User();
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setFirstName(signUpRequest.getFirstName());
        user.setLastName(signUpRequest.getLastName());
        userRepository.save(user);
        return login(new LoginRequest(signUpRequest.getEmail(), signUpRequest.getPassword()));
    }

    public RefreshTokenResponse refreshToken(String token) {
        tokenProvider.validateToken(token);
        final var userId = tokenProvider.getUserIdFromToken(token);
        final var userDetails = customUserDetailsService.loadUserById(userId);
        final var authentication = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities()
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return new RefreshTokenResponse(tokenProvider.createAccessToken(authentication));
    }
}
