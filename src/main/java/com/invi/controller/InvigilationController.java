package com.invi.controller;

import com.invi.model.Invigilation;
import com.invi.service.InvigilationService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/invigilation")
@CrossOrigin(origins = "http://localhost:3000")
public class InvigilationController {

    private final InvigilationService service;

    public InvigilationController(InvigilationService service){
        this.service=service;
    }

    @PostMapping("/assign")
    public Invigilation assign(@RequestBody Invigilation i){
        return service.assign(i);
    }


    @GetMapping("/all")
    public List<Invigilation> all(){
        return service.getAll();
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id){
        return service.deleteInvigilation(id);
    }
}