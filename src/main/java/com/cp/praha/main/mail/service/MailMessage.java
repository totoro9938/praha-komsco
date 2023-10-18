package com.cp.praha.main.mail.service;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.util.StringUtils;

import java.io.File;
import java.util.Date;
import java.util.List;
import java.util.Map;

import static org.springframework.util.CollectionUtils.isEmpty;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MailMessage {
    public final static String OTP_REGISTRATION = "mails/otp-registration";

    private String from;

    private String replyTo;

    private String[] to;

    private String[] cc;

    private String[] bcc;

    private Date sentDate;

    private String subject;

    private String text;

    private boolean html;

    private List<File> attachments;

    private String templateName;

    private Map<String, Object> attributes;

    public boolean isMultipart() {
        return isEmpty(this.attachments);
    }

    public boolean hasTemplateName() {
        return StringUtils.hasText(this.templateName);
    }
}
