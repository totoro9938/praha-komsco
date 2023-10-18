package com.cp.praha.common.util;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.Optional;

public class IpUtil {

  private IpUtil() {
    throw new IllegalStateException("Utility class");
  }
  /**
   * Request IP 정보.
   *
   * @param request 리퀘스트.
   * @return String 아이피.
   */
  public static String getClientIP(HttpServletRequest request) {
    var ip = request.getHeader("X-Forwarded-For");
    if (ip == null) {
      ip = request.getHeader("Proxy-Client-IP");
    }
    if (ip == null) {
      ip = request.getHeader("WL-Proxy-Client-IP");
    }
    if (ip == null) {
      ip = request.getHeader("HTTP_CLIENT_IP");
    }
    if (ip == null) {
      ip = request.getHeader("HTTP_X_FORWARDED_FOR");
    }
    if (ip == null) {
      ip = request.getRemoteAddr();
    }

    var ips = Arrays.asList(Optional.ofNullable(ip)
        .orElse("").split("[,]"));

    return ips.get(0).trim();
  }

}
