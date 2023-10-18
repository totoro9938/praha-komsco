package com.cp.praha.main.common.service;


import com.cp.praha.config.CacheConstants;
import com.cp.praha.main.common.entity.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class CommonService {

    private final DeptRepository deptRepository;
    private final CodeRepository codeRepository;
    private final UserRepository userRepository;
    private final CatRepository catRepository;
    private final CatLvlRepository catLvlRepository;
    private final ConfigRepository configRepository;
    private final TimeRepository timeRepository;


    @Cacheable(value = CacheConstants.CACHE_PREFIX +"_dept", key = "#deptId")
    public List<DeptEntity> getDept(int deptId) {
        if (deptId > 0) return deptRepository.findByDeptId(deptId, Sort.by("deptIdx"));
        else return deptRepository.findByDeptLvl(1, Sort.by("deptIdx"));
    }

    @Cacheable(value = CacheConstants.CACHE_PREFIX +"_code", key = "#codeGroupCd")
    public List<CodeEntity> getCode(String codeGroupCd) {
        return codeGroupCd.equals("ALL") ? codeRepository.findByCodeLvl(1, Sort.by("codeIdx")):codeRepository.findByCodeLvlAndCodeGroupCd(1, codeGroupCd, Sort.by("codeIdx"));
    }

    @Cacheable(value = CacheConstants.CACHE_PREFIX +"_user", key = "{#deptId, #userYn}")
    public List<UserEntity> getUsers(Integer deptId, List<String> userYn) {
        return deptId == 0 ? userRepository.getUserAll(userYn):userRepository.getUserDept(deptId, userYn);
    }

    public List<UserEntity> getUsersMatchDept(Integer deptId, List<String> userYn) {
        return deptId == 0 ? userRepository.getUserAll(userYn):userRepository.getUserMatchDept(deptId, userYn);
    }
    @Cacheable(value = CacheConstants.CACHE_PREFIX +"_callCat", key = "#catGroupCd")
    public List<CatEntity> getCat(String catGroupCd) {
        return catRepository.findByCatLvlAndCatGroupCd(1,catGroupCd,Sort.by("catIdx"));
    }

    public ConfigEntity getConfigItem(String configKey) {
        return configRepository.findByConfigKey(configKey);
    }
    public ConfigEntity getConfigItembyConfigKeyPath(String configKeyPath) {
        return configRepository.findByKeyPath(configKeyPath);
    }

    public TimeEntity getTime(){
        return timeRepository.getTime();
    }

    public List<CatLvlEntity> getCatLv1(int catLvl,String catGroupCd) {
        return catLvlRepository.findByCatLvlAndCatGroupCd( catLvl,catGroupCd,Sort.by("catIdx"));
    }
}
