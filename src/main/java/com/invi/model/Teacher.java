package com.invi.model;

import jakarta.persistence.*;

@Entity
public class Teacher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String phone;

    // ⭐ NEW FIELD
    private boolean whatsappEnabled = true;

    public Long getId(){ return id; }
    public void setId(Long id){ this.id = id; }

    public String getName(){ return name; }
    public void setName(String name){ this.name = name; }

    public String getEmail(){ return email; }
    public void setEmail(String email){ this.email = email; }

    public String getPhone(){ return phone; }
    public void setPhone(String phone){ this.phone = phone; }

    // ⭐ Getter & Setter for WhatsApp toggle
    public boolean isWhatsappEnabled(){
        return whatsappEnabled;
    }

    public void setWhatsappEnabled(boolean whatsappEnabled){
        this.whatsappEnabled = whatsappEnabled;
    }
}