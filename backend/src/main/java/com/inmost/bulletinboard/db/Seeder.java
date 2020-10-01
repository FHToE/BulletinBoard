package com.inmost.bulletinboard.db;

import com.inmost.bulletinboard.auth.AuthService;
import com.inmost.bulletinboard.bulletin.BulletinRepository;
import com.inmost.bulletinboard.bulletin.model.Bulletin;
import com.inmost.bulletinboard.image.ImageRepository;
import com.inmost.bulletinboard.image.model.Image;
import com.inmost.bulletinboard.user.UserRepository;
import com.inmost.bulletinboard.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class Seeder {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BulletinRepository bulletinRepository;
    @Autowired
    private AuthService authService;

    private static final String loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
            "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis " +
            "nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor " +
            "in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat " +
            "cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    private static final String[] images = {"https://i.imgur.com/L6YdThP.jpeg", "https://i.imgur.com/xOMMxD6.jpg",
        "https://i.imgur.com/WsgLLnQ.jpg", "https://i.imgur.com/VWu9Y9e.jpg", "https://i.imgur.com/YDLAmdW.jpeg", ""};

    @EventListener
    @Transactional
    public void seed(ContextRefreshedEvent event) {
        List<User> u = jdbcTemplate.query("SELECT * FROM users", (resultSet, rowNum) -> null);
        if(u == null || u.size() <= 0) {
            seed();
        }
    }

    private String getText() {
        String[] words = loremIpsum.split(" ");
        StringBuilder text = new StringBuilder();
        while (text.length() < 500) {
            text.append(" " + words[(int) (Math.random() * words.length)]);
        }
        return text.toString();
    }

    private String getName() {
        String[] words = loremIpsum.split(" ");
        return words[(int) (Math.random() * words.length)];
    }

    private void seed() {
        User JackieChan = User.builder().firstName("Jackie").lastName("Chan").email("JackieChan@mail.com")
                .password(authService.passwordEncoder.encode("JackieChan")).build();
        User TomSawyer = User.builder().firstName("Tom").lastName("Sawyer").email("TomSawyer@mail.com")
                .password(authService.passwordEncoder.encode("TomSawyer")).build();
        User HarryPotter = User.builder().firstName("Harry").lastName("Potter").email("HarryPotter@mail.com")
                .password(authService.passwordEncoder.encode("HarryPotter")).build();
        List<User> users = Arrays.asList(JackieChan, TomSawyer, HarryPotter);
        userRepository.saveAll(users);

        List<Bulletin> bulletins = new ArrayList<>();
        while (bulletins.size() < 300) {
            Image image = Image.builder().link(images[(int) (Math.random() * images.length)]).build();
            imageRepository.save(image);
            Bulletin bulletin = Bulletin.builder().image(image).name(getName()).text(getText())
                    .user(users.get((int) (Math.random() * users.size()))).build();
            bulletins.add(bulletin);
        }

        bulletinRepository.saveAll(bulletins);
    }
}
