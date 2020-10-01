package com.inmost.bulletinboard.bulletin.model;

import com.inmost.bulletinboard.db.BaseEntity;
import com.inmost.bulletinboard.image.model.Image;
import com.inmost.bulletinboard.user.model.User;
import lombok.*;

import javax.persistence.*;

@Data
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
@ToString(callSuper = true, onlyExplicitlyIncluded = true)
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "bulletins")
public class Bulletin extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "name")
    private String name;

    @Column(name = "text", length=1000)
    private String text;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinColumn(name = "image_id")
    private Image image;
}
