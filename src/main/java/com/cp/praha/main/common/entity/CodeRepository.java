package com.cp.praha.main.common.entity;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CodeRepository extends JpaRepository<CodeEntity, Integer> {
    List<CodeEntity> findByCodeLvlAndCodeGroupCd(int lvl, String codeGroupCd, Sort sort);
    List<CodeEntity> findByCodeLvl(int lvl, Sort sort);
}
