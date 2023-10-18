package com.cp.praha.common.exception;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.web.client.ResponseErrorHandler;

import java.io.IOException;

public class ApiErrorHandler implements ResponseErrorHandler {
	protected Log log = LogFactory.getLog(this.getClass());
	  @Override
	  public void handleError(ClientHttpResponse response) throws IOException {
	        if (response.getStatusCode() == HttpStatus.FORBIDDEN) {
	        	log.debug(HttpStatus.FORBIDDEN + " response. Throwing authentication exception");
	        }
	  }

	  @Override
	  public boolean hasError(ClientHttpResponse response) throws IOException {

		  HttpStatus statusCode = response.getStatusCode();

	        if (statusCode != HttpStatus.OK) {

	            if (statusCode == HttpStatus.FORBIDDEN) {
	            	log.error("Call returned a error 403 forbidden resposne ");
	                return true;
	            }

	            if(statusCode.series() == HttpStatus.Series.SERVER_ERROR) {
	            	log.error(HttpStatus.Series.SERVER_ERROR+" resposne ");
	            	return true;
	            }
	        }
	        return false;
	  }

}