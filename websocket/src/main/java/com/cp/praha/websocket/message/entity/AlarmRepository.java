package com.cp.praha.websocket.message.entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlarmRepository extends JpaRepository<AlarmEntity, Integer> {
    List<AlarmEntity> findBySrcId1AndSrcId2AndMdfYmd(String srcId1, String srcId2, String toDay);
}
