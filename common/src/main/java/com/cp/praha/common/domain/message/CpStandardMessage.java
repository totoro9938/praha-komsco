package com.cp.praha.common.domain.message;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.OffsetDateTime;
import java.util.Collection;
import java.util.Map;

public abstract class CpStandardMessage<T> {
  private final Header header;
  private final Collection<T> payload;

  protected CpStandardMessage(Header header, Collection<T> payload) {
    this.header = header;
    this.payload = payload;
  }

  @JsonCreator
  static CpStandardMessage<Map<String, Object>> defaultDeserialize(@JsonProperty("header") Header header, @JsonProperty("payload") Collection<Map<String, Object>> payload) {
    return new SimpleStandardMessage(header, payload);
  }

  public Header getHeader() {
    return this.header;
  }

  public Collection<T> getPayload() {
    return this.payload;
  }

  static class SimpleStandardMessage extends CpStandardMessage<Map<String, Object>> {
    SimpleStandardMessage(Header header, Collection<Map<String, Object>> payload) {
      super(header, payload);
    }
  }

  public static class Header {
    @JsonProperty("subject")
    private final String subject;
    @JsonProperty("issuer")
    private final String issuer;
    @JsonProperty("action")
    private final MessageAction action;
    @JsonProperty("version")
    private final String version;
    @JsonProperty("trace_id")
    private final String traceId;
    @JsonProperty("created_at")
    private final String createdAt;

    @JsonCreator
    public Header(@JsonProperty("subject") String subject, @JsonProperty("issuer") String issuer, @JsonProperty("version") String version, @JsonProperty("created_at") String createdAt, @JsonProperty("action") MessageAction action, @JsonProperty("trace_id") String traceId) {
      this.subject = subject;
      this.issuer = issuer;
      this.version = version;
      this.createdAt = createdAt;
      this.action = action;
      this.traceId = traceId;
    }

    @JsonIgnore
    public OffsetDateTime getCreateAt() {
      return OffsetDateTime.parse(this.createdAt);
    }

    public boolean equals(final Object o) {
      if (o == this) {
        return true;
      } else if (!(o instanceof CpStandardMessage.Header)) {
        return false;
      } else {
        Header other = (Header)o;
        if (!other.canEqual(this)) {
          return false;
        } else {
          Object this$subject = this.getSubject();
          Object other$subject = other.getSubject();
          if (this$subject == null) {
            if (other$subject != null) {
              return false;
            }
          } else if (!this$subject.equals(other$subject)) {
            return false;
          }

          Object this$issuer = this.getIssuer();
          Object other$issuer = other.getIssuer();
          if (this$issuer == null) {
            if (other$issuer != null) {
              return false;
            }
          } else if (!this$issuer.equals(other$issuer)) {
            return false;
          }

          Object this$action = this.getAction();
          Object other$action = other.getAction();
          if (this$action == null) {
            if (other$action != null) {
              return false;
            }
          } else if (!this$action.equals(other$action)) {
            return false;
          }

          label62: {
            Object this$version = this.getVersion();
            Object other$version = other.getVersion();
            if (this$version == null) {
              if (other$version == null) {
                break label62;
              }
            } else if (this$version.equals(other$version)) {
              break label62;
            }

            return false;
          }

          label55: {
            Object this$traceId = this.getTraceId();
            Object other$traceId = other.getTraceId();
            if (this$traceId == null) {
              if (other$traceId == null) {
                break label55;
              }
            } else if (this$traceId.equals(other$traceId)) {
              break label55;
            }

            return false;
          }

          Object this$createdAt = this.createdAt;
          Object other$createdAt = other.createdAt;
          if (this$createdAt == null) {
            if (other$createdAt != null) {
              return false;
            }
          } else if (!this$createdAt.equals(other$createdAt)) {
            return false;
          }

          return true;
        }
      }
    }

    protected boolean canEqual(final Object other) {
      return other instanceof CpStandardMessage.Header;
    }

    public int hashCode() {

      Object $subject = this.getSubject();
      int result = 1 * 59 + ($subject == null ? 43 : $subject.hashCode());
      Object $issuer = this.getIssuer();
      result = result * 59 + ($issuer == null ? 43 : $issuer.hashCode());
      Object $action = this.getAction();
      result = result * 59 + ($action == null ? 43 : $action.hashCode());
      Object $version = this.getVersion();
      result = result * 59 + ($version == null ? 43 : $version.hashCode());
      Object $traceId = this.getTraceId();
      result = result * 59 + ($traceId == null ? 43 : $traceId.hashCode());
      Object $createdAt = this.createdAt;
      result = result * 59 + ($createdAt == null ? 43 : $createdAt.hashCode());
      return result;
    }

    public String getSubject() {
      return this.subject;
    }

    public String getIssuer() {
      return this.issuer;
    }

    public MessageAction getAction() {
      return this.action;
    }

    public String getVersion() {
      return this.version;
    }

    public String getTraceId() {
      return this.traceId;
    }
  }
}
