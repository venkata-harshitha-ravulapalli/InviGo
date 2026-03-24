package com.invi.controller;

import com.invi.model.ExamHall;
import com.invi.repository.HallRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/hall")
@CrossOrigin(origins = "http://localhost:3000")
public class HallController {

    private final HallRepository repo;

    public HallController(HallRepository repo){
        this.repo=repo;
    }

    @PostMapping("/add")
    public ExamHall add(@RequestBody ExamHall h){
        return repo.save(h);
    }

    @GetMapping("/all")
    public List<ExamHall> all(){
        return repo.findAll();
    }

    @PutMapping("/update/{id}")
    public ExamHall update(@PathVariable Long id, @RequestBody ExamHall updatedHall){
        ExamHall hall = repo.findById(id).orElseThrow();

        hall.setHallName(updatedHall.getHallName());
        hall.setCapacity(updatedHall.getCapacity());

        return repo.save(hall);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id){
        repo.deleteById(id);
        return "Hall deleted successfully";
    }
}