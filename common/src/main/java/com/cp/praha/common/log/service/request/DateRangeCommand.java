package com.cp.praha.common.log.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.MethodParameter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.NotEmpty;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Slf4j
@ToString
@Setter
@Getter
public class DateRangeCommand {
   // @Phone
    private String phone;
    @NotEmpty
    private String centerName;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;

    private boolean days = false;
    private boolean weekly = true;
    private int interval = 1;

    @AssertTrue
    public boolean isDateFromTo() throws NoSuchMethodException, MethodArgumentNotValidException {

        BindingResult bindingResult = new BeanPropertyBindingResult(this, "DateRangeCommand");
        String message = "";
        log.info("{} - {}",startDate,endDate);
        if (endDate.isAfter(startDate)) {

            long between;
            if (days) {
                message += interval + "일 이내여야 합니다.";
                between = ChronoUnit.DAYS.between(startDate, endDate);
            } else if (weekly) {
                message += interval + "주 이내여야 합니다.";
                between = ChronoUnit.WEEKS.between(startDate, endDate);
            } else {
                message += interval + "개월 이내여야 합니다.";
                between = ChronoUnit.MONTHS.between(startDate, endDate);
            }

            if(interval > between){
                return true;
            }else{
                bindingResult.reject(message);
            }

        }else{
            bindingResult.reject("종료일자는 시작일자보다 작아야 합니다.");
        }
        if (bindingResult.hasErrors()) {
            throw new MethodArgumentNotValidException(
                    new MethodParameter(this.getClass()
                            .getMethod("", DateRangeCommand.class, BindingResult.class), 0),
                    bindingResult);
        }
        return false;
    }
}
