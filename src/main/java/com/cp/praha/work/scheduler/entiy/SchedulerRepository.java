package com.cp.praha.work.scheduler.entiy;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SchedulerRepository extends JpaRepository<TbScheduler,Integer> {
}
