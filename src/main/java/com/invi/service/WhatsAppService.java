package com.invi.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class WhatsAppService {

    @Value("${twilio.sid}")
    private String sid;

    @Value("${twilio.token}")
    private String token;

    @Value("${twilio.whatsapp}")
    private String from;

    public void send(String phone,String msg){

        Twilio.init(sid,token);
        if(!phone.startsWith("91")){
            phone="91"+phone;
        }

        Message.creator(
                new com.twilio.type.PhoneNumber("whatsapp:+"+phone),
                new com.twilio.type.PhoneNumber(from),
                msg
        ).create();

        System.out.println("WHATSAPP SENT SUCCESSFULLY");
    }
}