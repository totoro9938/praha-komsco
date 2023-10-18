package com.cp.praha.common.security;

import com.cp.praha.common.login.service.response.CpUserDetail;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Slf4j
@Component
public class UserInfo {

    /**
     * 세션정보 UserDetail 정보
     * @return CpUserDetail
     */
    public CpUserDetail getUser(){
        return (CpUserDetail)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    /**
     * 세션정보 유효 확인
     * @return boolean
     */
    public boolean isSession(){
        if(SecurityContextHolder.getContext()
                .getAuthentication()==null) return true;

        return SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal().equals("anonymousUser");
    }

    /**
     * 세션의 role 정보
     * @return List<String>
     */
    public List<String> getUserRole(String rolePattern){
        var user = this.getUser();
        var role = user.getAuthorities();
           return role.parallelStream().filter(o -> {
               if(rolePattern.isEmpty())return true;
               else return o.getAuthority().contains(rolePattern);
           }).map(Objects::toString).collect(Collectors.toList());
    }

    /**
     * 세션의 role 정보
     * @return boolean
     */
    public boolean isUserRole(String role){
        var user = this.getUser();
        var roles = user.getAuthorities();
        return roles.parallelStream().anyMatch(o -> o.getAuthority().equals(role));
    }
}
