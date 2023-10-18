package com.cp.praha.main.common.entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TimeRepository extends JpaRepository<TimeEntity, Integer> {
    String TIME_QUERY = "select now() as time";

    @Query(nativeQuery = true,value = TIME_QUERY)
    TimeEntity getTime();

}
