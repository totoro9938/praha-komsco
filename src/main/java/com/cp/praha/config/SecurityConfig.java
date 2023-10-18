package com.cp.praha.config;

import com.cp.praha.common.login.service.response.CpUserDetail;
import com.cp.praha.common.security.CpAccessDeniedHandler;
import com.cp.praha.common.security.CpAuthenticationEntryPoint;
import com.cp.praha.common.security.CpAuthenticationFailureHandler;
import com.cp.praha.common.security.CpPassword;
import com.cp.praha.main.login.service.CpUserDetailService;
import com.cp.praha.main.login.service.request.LogLogoutInsCommand;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

@Slf4j
@EnableWebSecurity
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(
        securedEnabled = true,
        jsr250Enabled = true,
        prePostEnabled = true
)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final CpUserDetailService cpUserDetailService;
    private final CpAuthenticationFailureHandler customAuthenticationFailureHandler;
    private final CpAccessDeniedHandler cpAccessDeniedHandler;

    public static final String AUTH_PAGE = "/auth/**";
    public static final String LOGIN_PAGE = "/auth";

    @Value("${server.servlet.session.cookie.name}")
    private String cookieName;

    @Override
    public void configure(WebSecurity web) {
        web.ignoring()
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new CpPassword();
    }


    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(cpUserDetailService);
        authProvider.setPasswordEncoder(passwordEncoder());

        return authProvider;
    }

    private LogoutSuccessHandler logoutSuccessHandler() {
        return (request, response, authentication) -> {
            if (authentication != null) {
                var user = (CpUserDetail)authentication.getPrincipal();
                log.debug("{}", user.toString());
                LogLogoutInsCommand command = new LogLogoutInsCommand();
                command.setUserId(user.getUserId());
                command.setIp(user.getConnectIp());
                cpUserDetailService.logout(command);
            }

            response.sendRedirect(LOGIN_PAGE);
        };
    }
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        log.debug("cookieName - {}",cookieName);
        http
                .headers(
                        headers -> headers.frameOptions().sameOrigin()
                )
                .authorizeRequests(
                        authorize -> authorize
                                .antMatchers("/","/error", AUTH_PAGE,"/log/v1/**","/cache/v1/dept/cache/reset","/cache/v1/dept/cache/select","/consult/v1/callback/callback-save").permitAll()
                                .antMatchers("/**").hasAnyAuthority("ROLE_ADMIN")
                )
                .formLogin(
                        formLogin -> formLogin
                                .loginPage("/auth")
                                .loginProcessingUrl("/login")
                                .usernameParameter("userCd")
                                .passwordParameter("userPwd")
                                .defaultSuccessUrl("/home")                 // 성공시 어디로갈까?
                                .failureHandler(customAuthenticationFailureHandler)
                                .permitAll()       // 로그인 경로는 모두 허용해줘야 한다.
                )
                .exceptionHandling(
                        exceptionHandling -> exceptionHandling
                                .authenticationEntryPoint(new CpAuthenticationEntryPoint(LOGIN_PAGE))
                                .accessDeniedHandler(cpAccessDeniedHandler) // 인증 거부 관련 처리
                )
                .logout(
                        logout -> logout
                                .logoutUrl("/logout")
                                .logoutSuccessUrl(LOGIN_PAGE)
//                                .logoutSuccessHandler(logoutSuccessHandler())
                                .deleteCookies(cookieName)
                )
               .sessionManagement(
                        session -> session
                                .maximumSessions(1)
                                .maxSessionsPreventsLogin(false)
                                .expiredUrl("/expired")
                                .sessionRegistry(new SessionRegistryImpl())
                )
                .csrf(
                        AbstractHttpConfigurer::disable
                );

    }


    // 인증 매니저
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

}

