package com.inmost.bulletinboard.user.model;

import com.inmost.bulletinboard.bulletin.model.Bulletin;
import com.inmost.bulletinboard.db.BaseEntity;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
@ToString(callSuper = true, onlyExplicitlyIncluded = true)
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User extends BaseEntity {
    @Column(name = "first_name", columnDefinition="TEXT")
    private String firstName;

    @Column(name = "last_name", columnDefinition="TEXT")
    private String lastName;

    @Column(name = "email", unique = true)
    @EqualsAndHashCode.Include
    private String email;

    @Column(name = "password")
    private String password;

    @Builder.Default
    @OneToMany(targetEntity = Bulletin.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    List<Bulletin> bulletins = List.of();

    public String getFullName() {
        return this.firstName + " " + this.lastName;
    }
}
