package com.cp.praha.main.common.web;

import com.cp.praha.main.common.entity.*;
import com.cp.praha.main.common.service.CommonService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/common/v1")
@Secured("ROLE_ADMIN")
public class CommonRestController {

    private final CommonService commonService;

    @GetMapping("/dept-all")
    public List<DeptEntity> getDept(@RequestParam(name = "deptId" ) Integer deptId){
        return commonService.getDept(deptId);
    }

    @GetMapping("/code/{codeGroupCd}")
    public List<CodeEntity> getDept(@PathVariable String codeGroupCd){
        return commonService.getCode(codeGroupCd);
    }

    @GetMapping("/user/{deptId}")
    public List<UserEntity> getUser(@PathVariable Integer deptId, @RequestParam(name = "useYn") List<String> useYn){
        return commonService.getUsers(deptId,useYn);
    }

    @GetMapping("/user/match/{deptId}")
    public List<UserEntity> getUserMatchDept(@PathVariable Integer deptId, @RequestParam(name = "useYn") List<String> useYn){
        return commonService.getUsersMatchDept(deptId,useYn);
    }

    @GetMapping("/cat/{catGroupCd}")
    public List<CatEntity> getCat(@PathVariable String catGroupCd){
        return commonService.getCat(catGroupCd);
    }

    @GetMapping("/config/{configKey}")
    public ConfigEntity getConfigItem(@PathVariable String configKey){
        return commonService.getConfigItem(configKey);
    }

    @GetMapping("/config/path/{configKeyPath}")
    public ConfigEntity getConfigItembyConfigKeyPath(@PathVariable String configKeyPath){
        return commonService.getConfigItembyConfigKeyPath(configKeyPath);
    }

    @GetMapping("/timestamp")
    public TimeEntity getDbTime(){
        return commonService.getTime();
    }

    @GetMapping("/cat/list/{catLvl}/{catGroupCd}")
    public List<CatLvlEntity> getCatLv1(@PathVariable int catLvl,@PathVariable String catGroupCd){
        return commonService.getCatLv1(catLvl,catGroupCd);
    }
}
