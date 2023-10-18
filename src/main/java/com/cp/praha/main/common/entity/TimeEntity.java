package com.cp.praha.main.common.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;
import java.time.ZonedDateTime;

@Setter
@Getter
@Entity
public class TimeEntity implements Serializable {
    @Id
    private ZonedDateTime time;
}