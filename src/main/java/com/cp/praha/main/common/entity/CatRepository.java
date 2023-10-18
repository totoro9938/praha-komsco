package com.cp.praha.main.common.entity;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CatRepository extends JpaRepository<CatEntity, Integer> {
    List<CatEntity> findByCatLvlAndCatGroupCd(int catLvl, String catGroupCd, Sort sort);
}
