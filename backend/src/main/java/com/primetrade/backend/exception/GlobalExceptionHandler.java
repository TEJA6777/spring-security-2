package com.primetrade.backend.exception;

import org.xml.sax.helpers.DefaultHandler;

public class GlobalExceptionHandler extends RuntimeException{
    public GlobalExceptionHandler(String message){
            super(message);
    }
}
