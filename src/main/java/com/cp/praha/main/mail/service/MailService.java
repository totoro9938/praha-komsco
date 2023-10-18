package com.cp.praha.main.mail.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.mail.MailProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.Context;
import org.thymeleaf.context.IContext;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.File;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
@EnableConfigurationProperties(MailProperties.class)
public class MailService {

    private final MailProperties mailProperties;
    private final JavaMailSender javaMailSender ;
    private final SpringTemplateEngine emailTemplateEngine;

    public void send(MailMessage mailMessage) {
        doSend(mailMessage);
    }

    public void send(List<MailMessage> mailMessages) {
        mailMessages.forEach(this::send);

    }

    private void doSend(MailMessage mailMessage) {

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        try {
            log.debug("{} - {} - {}",mailProperties.getHost(),mailProperties.getPort(),mailProperties.getUsername());
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, mailMessage.isMultipart(), "UTF-8");
            helper.setFrom(mailProperties.getUsername());
            helper.setTo(mailMessage.getTo());
            helper.setSubject(mailMessage.getSubject());
            if(mailMessage.hasTemplateName()) {
                IContext context = new Context(LocaleContextHolder.getLocale(), mailMessage.getAttributes());
                mailMessage.setText(emailTemplateEngine.process(mailMessage.getTemplateName(), context));
                mailMessage.setHtml(true);
            }
            helper.setText(mailMessage.getText(), mailMessage.isHtml());

            if (mailMessage.getReplyTo() != null) {
                helper.setReplyTo(mailMessage.getReplyTo());
            }
            if (mailMessage.getCc() != null) {
                helper.setCc(mailMessage.getCc());
            }
            if (mailMessage.getBcc() != null) {
                helper.setBcc(mailMessage.getBcc());
            }
            if (mailMessage.getAttachments() != null) {
                for (File attachment : mailMessage.getAttachments()) {
                    helper.addAttachment(attachment.getName(), attachment);
                }
            }

            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            log.error(e.toString());
        }

    }

}
