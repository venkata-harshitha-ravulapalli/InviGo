package com.invi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class InviApplication {
	public static void main(String[] args){
		SpringApplication.run(InviApplication.class,args);
	}
}