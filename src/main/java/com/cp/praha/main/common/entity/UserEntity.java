package com.cp.praha.main.common.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Setter
@Getter
@Entity
@Table(name = "tb_user")
@Where(clause = "DEL_YN = 'N' AND SYS_YN = 'N'")
public class UserEntity implements Serializable {
    @Id
    @Column(name = "USER_ID")
    private Integer userId;


    @Column(name = "USER_NM", nullable = false, length = 100)
    private String userNm;

    @Column(name="TEL_NO")
    private String telNo;

    @Column(name="CTI_YN")
    private String ctiYn;
}