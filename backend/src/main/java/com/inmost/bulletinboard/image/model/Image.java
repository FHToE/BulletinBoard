package com.inmost.bulletinboard.image.model;

import com.inmost.bulletinboard.db.BaseEntity;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Data
@EqualsAndHashCode(callSuper=true)
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "images")
@Builder
public class Image extends BaseEntity {
    @Column(name = "link", nullable = false)
    private String link;
}
