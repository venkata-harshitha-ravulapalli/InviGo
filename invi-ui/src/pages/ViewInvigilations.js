import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaUser, FaSchool, FaFilter } from "react-icons/fa";

function ViewInvigilations(){

    const [invList,setInvList] = useState([]);
    const [teachers,setTeachers] = useState([]);
    const [halls,setHalls] = useState([]);

    const [teacherFilter,setTeacherFilter] = useState("");
    const [hallFilter,setHallFilter] = useState("");
    const [statusFilter,setStatusFilter] = useState("ALL");

    useEffect(()=>{
        loadAll();
    },[]);

    const loadAll = () => {
        axios.get("http://localhost:8081/invigilation/all")
            .then(res=>setInvList(res.data));

        axios.get("http://localhost:8081/teacher/all")
            .then(res=>setTeachers(res.data));

        axios.get("http://localhost:8081/hall/all")
            .then(res=>setHalls(res.data));
    };

    const getStatus = (inv) => {
        const now = new Date();
        const start = new Date(`${inv.startDate}T${inv.startTime}`);
        const end = new Date(`${inv.startDate}T${inv.endTime}`);

        if(now < start) return "Upcoming";
        if(now >= start && now <= end) return "Active";
        return "Completed";
    };

    const deleteInv = (id) => {
        if(window.confirm("🗑 Delete this invigilation?")){
            axios.delete(`http://localhost:8081/invigilation/delete/${id}`)
                .then(()=>loadAll());
        }
    };

    const filtered = invList.filter(inv=>{
        if(teacherFilter && inv.teacher?.id != teacherFilter) return false;
        if(hallFilter && inv.hall?.id != hallFilter) return false;
        if(statusFilter !== "ALL" && getStatus(inv) !== statusFilter) return false;
        return true;
    });

    return(
        <div className="container-fluid p-4">

            <h2 className="fw-bold mb-4">📋 All Invigilations</h2>

            {/* FILTER SECTION */}
            <div className="card shadow-sm p-3 mb-4">
                <h6 className="mb-3"><FaFilter/> Filters</h6>

                <div className="row">

                    <div className="col-md-3">
                        <label><FaUser/> Teacher</label>
                        <select className="form-control"
                                onChange={e=>setTeacherFilter(e.target.value)}>
                            <option value="">All Teachers</option>
                            {teachers.map(t=>(
                                <option key={t.id} value={t.id}>
                                    {t.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-3">
                        <label><FaSchool/> Hall</label>
                        <select className="form-control"
                                onChange={e=>setHallFilter(e.target.value)}>
                            <option value="">All Halls</option>
                            {halls.map(h=>(
                                <option key={h.id} value={h.id}>
                                    {h.hallName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-3">
                        <label>📌 Status</label>
                        <select className="form-control"
                                onChange={e=>setStatusFilter(e.target.value)}>
                            <option value="ALL">All</option>
                            <option value="Active">Active</option>
                            <option value="Upcoming">Upcoming</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                </div>
            </div>

            {/* TABLE */}
            <div className="card shadow-sm">
                <div className="card-body">

                    <table className="table table-hover align-middle">
                        <thead className="table-light">
                        <tr>
                            <th>📘 Subject</th>
                            <th>📅 Date</th>
                            <th>⏰ Time</th>
                            <th>👩‍🏫 Teacher</th>
                            <th>🏫 Hall</th>
                            <th>📌 Status</th>
                            <th>⚙ Action</th>
                        </tr>
                        </thead>

                        <tbody>

                        {filtered.length===0 && (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    😕 No records found
                                </td>
                            </tr>
                        )}

                        {filtered.map(inv=>{

                            const status = getStatus(inv);

                            let badge="bg-secondary";
                            if(status==="Active") badge="bg-success";
                            if(status==="Upcoming") badge="bg-warning text-dark";
                            if(status==="Completed") badge="bg-danger";

                            return(
                                <tr key={inv.id}>
                                    <td><b>{inv.examName}</b></td>
                                    <td>{inv.startDate}</td>
                                    <td>{inv.startTime} - {inv.endTime}</td>
                                    <td>{inv.teacher?.name}</td>
                                    <td>{inv.hall?.hallName}</td>

                                    <td>
                                        <span className={`badge ${badge}`}>
                                            {status}
                                        </span>
                                    </td>

                                    <td>
                                        <button
                                            onClick={()=>deleteInv(inv.id)}
                                            title="Delete"
                                            style={{
                                                background:"#ef4444",
                                                color:"white",
                                                border:"none",
                                                padding:"6px 10px",
                                                borderRadius:"8px"
                                            }}
                                        >
                                            <FaTrash/>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}

                        </tbody>
                    </table>

                </div>
            </div>

        </div>
    );
}

export default ViewInvigilations;