package com.inmost.bulletinboard.exceptions.handling.brief;

import com.inmost.bulletinboard.exceptions.handling.ApiError;
import com.inmost.bulletinboard.exceptions.handling.ApiErrorFactory;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
public class ShortApiErrorFactory implements ApiErrorFactory {
	@Override
	public ApiError create(HttpStatus status, String message, Exception ex) {
		return ShortApiError.of(status, message, ex);
	}

	@Override
	public ApiError create(HttpStatus status, Exception ex) {
		return ShortApiError.of(status, ex);
	}
}
