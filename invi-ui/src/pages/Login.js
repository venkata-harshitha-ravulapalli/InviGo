import React, { useState } from "react";
import axios from "axios";
import { FaUserShield, FaChalkboardTeacher, FaEye, FaEyeSlash, FaEnvelope, FaPhone } from "react-icons/fa";

function Login({ setRole, setTeacher }) {

    const [isAdmin, setIsAdmin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const [adminData, setAdminData] = useState({
        email: "",
        password: ""
    });

    const [teacherData, setTeacherData] = useState({
        email: "",
        phone: ""
    });

    // ---------------- ADMIN LOGIN ----------------
    const handleAdminLogin = (e) => {
        e.preventDefault();

        if(adminData.email === "admin@invigo.com" && adminData.password === "admin123"){
            setRole("admin");
        } else {
            alert("Invalid admin credentials");
        }
    };

    // ---------------- TEACHER LOGIN ----------------
    const handleTeacherLogin = async (e) => {
        e.preventDefault();

        try{
            const res = await axios.get(
                `http://localhost:8081/teacher/email/${teacherData.email}`
            );

            const teacher = res.data;

            if(!teacher){
                alert("Teacher not found");
                return;
            }

            if(teacher.phone === teacherData.phone){
                setTeacher(teacher);
                setRole("teacher");
            } else {
                alert("Phone number does not match");
            }

        }catch{
            alert("Not authorized");
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                height:"100vh",
                background:"linear-gradient(135deg,#1e3a8a,#0f172a)"
            }}
        >

            <div
                className="d-flex"
                style={{
                    width:"900px",
                    background:"#fff",
                    borderRadius:"16px",
                    overflow:"hidden",
                    boxShadow:"0 20px 60px rgba(0,0,0,0.3)"
                }}
            >

                {/* LEFT INFO PANEL */}
                <div style={{
                    width:"45%",
                    background:"linear-gradient(180deg,#2563eb,#1e3a8a)",
                    color:"#fff",
                    padding:"40px",
                    display:"flex",
                    flexDirection:"column",
                    justifyContent:"center"
                }}>
                    <h2 style={{fontWeight:"bold"}}>🎓 INVIGO</h2>
                    <p style={{opacity:"0.9"}}>
                        Smart Invigilation Management System for universities.
                        Assign duties, manage teachers, and automate exam hall supervision easily.
                    </p>

                    <div className="mt-4">
                        <p>✔ Smart duty allocation</p>
                        <p>✔ Email notifications</p>
                        <p>✔ Teacher dashboard</p>
                    </div>
                </div>

                {/* LOGIN FORM */}
                <div style={{width:"55%", padding:"40px"}}>

                    <h3 className="text-center mb-4" style={{fontWeight:"bold"}}>
                        Login to Continue
                    </h3>

                    {/* TOGGLE */}
                    <div className="d-flex justify-content-center mb-4">
                        <button
                            className={`btn me-2 ${isAdmin ? "btn-primary" : "btn-outline-primary"}`}
                            onClick={()=>setIsAdmin(true)}
                            style={{borderRadius:"20px",padding:"8px 20px"}}
                        >
                            <FaUserShield/> Admin
                        </button>

                        <button
                            className={`btn ${!isAdmin ? "btn-primary" : "btn-outline-primary"}`}
                            onClick={()=>setIsAdmin(false)}
                            style={{borderRadius:"20px",padding:"8px 20px"}}
                        >
                            <FaChalkboardTeacher/> Teacher
                        </button>
                    </div>

                    {isAdmin ? (

                        <form onSubmit={handleAdminLogin}>

                            <label>Email</label>
                            <div className="input-group mb-3">
                                <span className="input-group-text"><FaEnvelope/></span>
                                <input
                                    className="form-control"
                                    placeholder="Admin Email"
                                    onChange={e=>setAdminData({...adminData,email:e.target.value})}
                                    required
                                />
                            </div>

                            <label>Password</label>
                            <div className="input-group mb-4">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    placeholder="Password"
                                    onChange={e=>setAdminData({...adminData,password:e.target.value})}
                                    required
                                />
                                <span
                                    className="input-group-text"
                                    style={{cursor:"pointer"}}
                                    onClick={()=>setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash/> : <FaEye/>}
                                </span>
                            </div>

                            <button
                                className="btn w-100"
                                style={{
                                    background:"linear-gradient(90deg,#2563eb,#1d4ed8)",
                                    color:"#fff",
                                    fontWeight:"bold",
                                    borderRadius:"8px",
                                    padding:"10px",
                                    transition:"0.3s"
                                }}
                            >
                                Login as Admin
                            </button>

                        </form>

                    ) : (

                        <form onSubmit={handleTeacherLogin}>

                            <label>Email</label>
                            <div className="input-group mb-3">
                                <span className="input-group-text"><FaEnvelope/></span>
                                <input
                                    className="form-control"
                                    placeholder="Teacher Email"
                                    onChange={e=>setTeacherData({...teacherData,email:e.target.value})}
                                    required
                                />
                            </div>

                            <label>Phone</label>
                            <div className="input-group mb-4">
                                <span className="input-group-text"><FaPhone/></span>
                                <input
                                    className="form-control"
                                    placeholder="Phone Number"
                                    onChange={e=>setTeacherData({...teacherData,phone:e.target.value})}
                                    required
                                />
                            </div>

                            <button
                                className="btn w-100"
                                style={{
                                    background:"linear-gradient(90deg,#2563eb,#1d4ed8)",
                                    color:"#fff",
                                    fontWeight:"bold",
                                    borderRadius:"8px",
                                    padding:"10px"
                                }}
                            >
                                Login as Teacher
                            </button>

                        </form>
                    )}

                </div>
            </div>
        </div>
    );
}

export default Login;