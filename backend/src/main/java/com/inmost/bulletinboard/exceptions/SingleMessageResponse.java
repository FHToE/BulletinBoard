package com.inmost.bulletinboard.exceptions;

import lombok.Getter;

public class SingleMessageResponse {

    @Getter
    private final String message;

    public SingleMessageResponse(String message) {
        this.message = message;
    }

}
