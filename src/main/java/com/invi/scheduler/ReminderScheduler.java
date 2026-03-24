package com.invi.scheduler;

import com.invi.model.Invigilation;
import com.invi.repository.InvigilationRepository;
import com.invi.service.EmailService;
import com.invi.service.WhatsAppService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.*;
import java.util.List;

@Component
public class ReminderScheduler {

    private final InvigilationRepository repo;
    private final EmailService email;
    private final WhatsAppService whatsapp;
    public ReminderScheduler(InvigilationRepository repo,
                             EmailService email,
                             WhatsAppService whatsapp){
        this.repo = repo;
        this.email = email;
        this.whatsapp = whatsapp;
    }

    @Scheduled(cron = "0 * * * * *")
    public void sendReminder(){

        System.out.println("⏰ Scheduler running...");

        List<Invigilation> list =
                repo.findByStatusAndReminderSent("ACTIVE", false);

        for(Invigilation inv : list){

            try{

                LocalDate examDate = LocalDate.parse(inv.getStartDate());
                LocalTime examTime = LocalTime.parse(inv.getStartTime());

                LocalDateTime examDateTime =
                        LocalDateTime.of(examDate, examTime);

                LocalDateTime now = LocalDateTime.now();

                long minutes =
                        Duration.between(now, examDateTime).toMinutes();

                if(minutes <= 60 && minutes >= 55){

                    String msg =
                            "⏰ INVIGILATION REMINDER\n\n" +
                                    "Subject: " + inv.getExamName() + "\n" +
                                    "Date: " + inv.getStartDate() + "\n" +
                                    "Time: " + inv.getStartTime() + " - " + inv.getEndTime() + "\n" +
                                    "Hall: " + inv.getHall().getHallName();

                    email.send(inv.getTeacher().getEmail(),"Reminder",msg);
                    whatsapp.send(inv.getTeacher().getPhone(),msg);

                    inv.setReminderSent(true);
                    repo.save(inv);

                    System.out.println("1 HOUR REMINDER SENT");
                }

            }catch(Exception e){
                System.out.println("Reminder error "+e.getMessage());
            }
        }
    }
}
