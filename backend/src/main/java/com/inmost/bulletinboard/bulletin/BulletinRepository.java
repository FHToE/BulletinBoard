package com.inmost.bulletinboard.bulletin;

import com.inmost.bulletinboard.bulletin.model.Bulletin;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;


import java.awt.print.Pageable;
import java.util.UUID;

public interface BulletinRepository extends JpaRepository<Bulletin, UUID> {
}
