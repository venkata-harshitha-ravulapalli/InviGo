package com.invi.service;

import com.invi.model.Invigilation;
import com.invi.model.Teacher;
import com.invi.model.ExamHall;
import com.invi.repository.InvigilationRepository;
import com.invi.repository.TeacherRepository;
import com.invi.repository.HallRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class InvigilationService {

    @Autowired
    private InvigilationRepository repo;

    @Autowired
    private TeacherRepository teacherRepo;

    @Autowired
    private HallRepository hallRepo;

    @Autowired
    private EmailService emailService;

    @Autowired
    private WhatsAppService whatsappService;

    public Invigilation assign(Invigilation newDuty){

        Teacher teacher = teacherRepo.findById(newDuty.getTeacher().getId())
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        ExamHall hall = hallRepo.findById(newDuty.getHall().getId())
                .orElseThrow(() -> new RuntimeException("Hall not found"));

        newDuty.setTeacher(teacher);
        newDuty.setHall(hall);


        List<Invigilation> teacherList =
                repo.findByTeacherIdAndStartDate(
                        teacher.getId(),
                        newDuty.getStartDate()
                );

        for(Invigilation existing : teacherList){
            if(isOverlapping(
                    newDuty.getStartTime(),
                    newDuty.getEndTime(),
                    existing.getStartTime(),
                    existing.getEndTime()
            )){
                throw new ResponseStatusException(
                        HttpStatus.CONFLICT,
                        "Teacher already assigned in this time slot"
                );
            }
        }


        List<Invigilation> hallList =
                repo.findByHallIdAndStartDate(
                        hall.getId(),
                        newDuty.getStartDate()
                );

        for(Invigilation existing : hallList){
            if(isOverlapping(
                    newDuty.getStartTime(),
                    newDuty.getEndTime(),
                    existing.getStartTime(),
                    existing.getEndTime()
            )){
                throw new ResponseStatusException(
                        HttpStatus.CONFLICT,
                        "Hall already assigned in this time slot"
                );
            }
        }

        Invigilation saved = repo.save(newDuty);

        try{

            String msg =
                    "📢 NEW INVIGILATION ASSIGNED\n\n" +
                            "Subject: " + saved.getExamName() + "\n" +
                            "Date: " + saved.getStartDate() + "\n" +
                            "Time: " + saved.getStartTime() + " - " + saved.getEndTime() + "\n" +
                            "Hall: " + hall.getHallName();

            emailService.send(
                    teacher.getEmail(),
                    "New Invigilation Assigned",
                    msg
            );

            whatsappService.send(
                    teacher.getPhone(),
                    msg
            );

            System.out.println("INSTANT EMAIL & WHATSAPP SENT");

        }catch(Exception e){
            System.out.println("Instant send error: "+e.getMessage());
        }

        return saved;
    }

    public List<Invigilation> getAll(){
        return repo.findAll();
    }

    public String deleteInvigilation(Long id){
        repo.deleteById(id);
        return "Deleted successfully";
    }

    private boolean isOverlapping(
            String newStart,String newEnd,
            String oldStart,String oldEnd){

        return newStart.compareTo(oldEnd) < 0 &&
                newEnd.compareTo(oldStart) > 0;
    }

}
