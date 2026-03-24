package com.invi.controller;

import com.invi.model.Teacher;
import com.invi.repository.TeacherRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/teacher")
@CrossOrigin(origins = "http://localhost:3000")
public class TeacherController {

    private final TeacherRepository repo;

    public TeacherController(TeacherRepository repo){
        this.repo=repo;
    }

    @PostMapping("/add")
    public Teacher add(@RequestBody Teacher t){
        return repo.save(t);
    }

    @GetMapping("/all")
    public List<Teacher> all(){
        return repo.findAll();
    }

    @GetMapping("/email/{email}")
    public Teacher getByEmail(@PathVariable String email){
        return repo.findByEmail(email);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id){
        repo.deleteById(id);
        return "Teacher deleted successfully";
    }

    @PutMapping("/update/{id}")
    public Teacher update(@PathVariable Long id, @RequestBody Teacher updatedTeacher){

        Teacher teacher = repo.findById(id).orElseThrow();

        teacher.setName(updatedTeacher.getName());
        teacher.setEmail(updatedTeacher.getEmail());
        teacher.setPhone(updatedTeacher.getPhone());
        teacher.setWhatsappEnabled(updatedTeacher.isWhatsappEnabled());

        return repo.save(teacher);
    }
}