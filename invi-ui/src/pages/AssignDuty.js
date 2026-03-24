import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserTie, FaSchool, FaBook, FaCalendarAlt, FaClock, FaCheckCircle } from "react-icons/fa";

function AssignDuty(){

    const [teachers,setTeachers] = useState([]);
    const [halls,setHalls] = useState([]);

    const [teacherId,setTeacherId] = useState("");
    const [hallId,setHallId] = useState("");
    const [examName,setExamName] = useState("");
    const [date,setDate] = useState("");
    const [startTime,setStartTime] = useState("");
    const [endTime,setEndTime] = useState("");

    useEffect(()=>{
        loadData();
    },[]);

    const loadData = () => {
        axios.get("http://localhost:8081/teacher/all")
            .then(res=>setTeachers(res.data))
            .catch(()=>setTeachers([]));

        axios.get("http://localhost:8081/hall/all")
            .then(res=>setHalls(res.data))
            .catch(()=>setHalls([]));
    };

    const assign = async () => {

        if(!teacherId || !hallId || !examName || !date || !startTime || !endTime){
            alert("Please fill all fields");
            return;
        }

        const now = new Date();
        const start = new Date(`${date}T${startTime}`);
        const end = new Date(`${date}T${endTime}`);

        if(start.toDateString() !== now.toDateString() && start < now){
            alert("Cannot assign invigilation for past date");
            return;
        }

        if(start.toDateString() === now.toDateString() && start <= now){
            alert("Cannot assign invigilation for already started time");
            return;
        }

        if(end <= start){
            alert("End time must be after start time");
            return;
        }

        try{
            await axios.post("http://localhost:8081/invigilation/assign",{
                examName: examName,
                startDate: date,
                startTime: startTime,
                endTime: endTime,
                status: "ACTIVE",
                teacher: { id: teacherId },
                hall: { id: hallId }
            });

            alert("Invigilation Assigned Successfully 🎉");

            setExamName("");
            setDate("");
            setStartTime("");
            setEndTime("");
            setTeacherId("");
            setHallId("");

        }catch(error){

            if(error.response && error.response.status === 409){
                alert("Hall or teacher already assigned for this time slot.");
            }
            else if(error.response && error.response.data){
                alert(error.response.data);
            }
            else{
                alert("Error assigning invigilation. Please try again.");
            }
        }
    };

    return(
        <div className="container-fluid">

            {/* HEADER */}
            <div className="mb-4">
                <h2 style={{fontWeight:"bold"}}>📝 Assign Invigilation</h2>
                <p style={{color:"#64748b"}}>
                    Assign teachers to exam halls efficiently with smart scheduling.
                </p>
            </div>

            <div
                style={{
                    background:"#fff",
                    borderRadius:"16px",
                    padding:"30px",
                    boxShadow:"0 15px 40px rgba(0,0,0,0.08)"
                }}
            >

                <div className="row g-4">

                    {/* SUBJECT */}
                    <div className="col-md-6">
                        <label className="fw-semibold">Subject</label>
                        <div className="input-group">
                            <span className="input-group-text"><FaBook/></span>
                            <input
                                className="form-control"
                                placeholder="Enter Subject"
                                value={examName}
                                onChange={e=>setExamName(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* DATE */}
                    <div className="col-md-6">
                        <label className="fw-semibold">Date</label>
                        <div className="input-group">
                            <span className="input-group-text"><FaCalendarAlt/></span>
                            <input
                                type="date"
                                className="form-control"
                                value={date}
                                onChange={e=>setDate(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* START */}
                    <div className="col-md-6">
                        <label className="fw-semibold">Start Time</label>
                        <div className="input-group">
                            <span className="input-group-text"><FaClock/></span>
                            <input
                                type="time"
                                className="form-control"
                                value={startTime}
                                onChange={e=>setStartTime(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* END */}
                    <div className="col-md-6">
                        <label className="fw-semibold">End Time</label>
                        <div className="input-group">
                            <span className="input-group-text"><FaClock/></span>
                            <input
                                type="time"
                                className="form-control"
                                value={endTime}
                                onChange={e=>setEndTime(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* TEACHER */}
                    <div className="col-md-6">
                        <label className="fw-semibold">Select Teacher</label>
                        <div className="input-group">
                            <span className="input-group-text"><FaUserTie/></span>
                            <select
                                className="form-control"
                                value={teacherId}
                                onChange={e=>setTeacherId(e.target.value)}
                            >
                                <option value="">Choose Teacher</option>
                                {teachers.map(t=>(
                                    <option key={t.id} value={t.id}>
                                        {t.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* HALL */}
                    <div className="col-md-6">
                        <label className="fw-semibold">Select Hall</label>
                        <div className="input-group">
                            <span className="input-group-text"><FaSchool/></span>
                            <select
                                className="form-control"
                                value={hallId}
                                onChange={e=>setHallId(e.target.value)}
                            >
                                <option value="">Choose Hall</option>
                                {halls.map(h=>(
                                    <option key={h.id} value={h.id}>
                                        {h.hallName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                </div>

                {/* BUTTON */}
                <div className="mt-4">
                    <button
                        className="btn w-100"
                        onClick={assign}
                        style={{
                            background:"linear-gradient(90deg,#2563eb,#1d4ed8)",
                            color:"#fff",
                            fontWeight:"bold",
                            padding:"12px",
                            borderRadius:"10px",
                            fontSize:"16px",
                            transition:"0.3s"
                        }}
                        onMouseOver={e=>e.target.style.transform="scale(1.02)"}
                        onMouseOut={e=>e.target.style.transform="scale(1)"}
                    >
                        <FaCheckCircle/> Assign Invigilation
                    </button>
                </div>

            </div>
        </div>
    );
}

export default AssignDuty;