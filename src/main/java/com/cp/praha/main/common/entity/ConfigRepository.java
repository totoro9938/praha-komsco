package com.cp.praha.main.common.entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfigRepository extends JpaRepository<ConfigEntity, Integer> {
    ConfigEntity findByConfigId(int lvl);
    ConfigEntity findByConfigKey(String configKey);
    ConfigEntity findByKeyPath(String configKeyPath);
}
