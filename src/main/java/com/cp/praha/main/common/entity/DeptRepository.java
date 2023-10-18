package com.cp.praha.main.common.entity;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeptRepository extends JpaRepository<DeptEntity, Integer> {
    List<DeptEntity> findByDeptLvl(int lvl, Sort sort);

    List<DeptEntity> findByDeptId(int deptId, Sort sort);
}
