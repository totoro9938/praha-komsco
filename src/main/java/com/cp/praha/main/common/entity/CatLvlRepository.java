package com.cp.praha.main.common.entity;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CatLvlRepository extends JpaRepository<CatLvlEntity, Integer> {
    List<CatLvlEntity> findByCatLvlAndCatGroupCd(int catLvl, String catGroupCd, Sort sort);
}
