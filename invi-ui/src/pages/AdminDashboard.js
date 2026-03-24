import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaChalkboardTeacher, FaSchool, FaClipboardList, FaCalendarDay } from "react-icons/fa";

function AdminDashboard(){

    const [totalTeachers,setTotalTeachers] = useState(0);
    const [totalHalls,setTotalHalls] = useState(0);
    const [totalInvigilations,setTotalInvigilations] = useState(0);
    const [todayExams,setTodayExams] = useState(0);

    useEffect(()=>{
        loadDashboard();
    },[]);

    const loadDashboard = () => {

        axios.get("http://localhost:8081/teacher/all")
            .then(res=>{
                setTotalTeachers(res.data.length);
            })
            .catch(()=>{
                setTotalTeachers(0);
            });

        axios.get("http://localhost:8081/hall/all")
            .then(res=>{
                setTotalHalls(res.data.length);
            })
            .catch(()=>{
                setTotalHalls(0);
            });

        axios.get("http://localhost:8081/invigilation/all")
            .then(res=>{
                const list = res.data;
                setTotalInvigilations(list.length);

                const today = new Date().toISOString().split("T")[0];
                const todayCount = list.filter(i => i.startDate === today).length;
                setTodayExams(todayCount);
            })
            .catch(()=>{
                setTotalInvigilations(0);
                setTodayExams(0);
            });
    };

    return(
        <div className="container-fluid">

            {/* HEADER */}
            <div className="mb-4">
                <h2 style={{fontWeight:"bold"}}>📊 Admin Dashboard</h2>
                <p style={{color:"#64748b"}}>
                    Welcome Admin! Here's your invigilation system overview.
                </p>
            </div>

            {/* STATS CARDS */}
            <div className="row g-4">

                <DashboardCard
                    title="Total Teachers"
                    value={totalTeachers}
                    icon={<FaChalkboardTeacher size={28}/>}
                    color="#2563eb"
                />

                <DashboardCard
                    title="Total Halls"
                    value={totalHalls}
                    icon={<FaSchool size={28}/>}
                    color="#16a34a"
                />

                <DashboardCard
                    title="Total Invigilations"
                    value={totalInvigilations}
                    icon={<FaClipboardList size={28}/>}
                    color="#9333ea"
                />

                <DashboardCard
                    title="Today's Exams"
                    value={todayExams}
                    icon={<FaCalendarDay size={28}/>}
                    color="#ea580c"
                />

            </div>

        </div>
    );
}

/* CARD COMPONENT */
function DashboardCard({title,value,icon,color}){
    return(
        <div className="col-md-3">
            <div
                style={{
                    background:"#fff",
                    borderRadius:"16px",
                    padding:"25px",
                    boxShadow:"0 10px 25px rgba(0,0,0,0.08)",
                    transition:"0.3s",
                    cursor:"pointer",
                    borderTop:`5px solid ${color}`
                }}
                onMouseOver={e=>{
                    e.currentTarget.style.transform="translateY(-6px)";
                    e.currentTarget.style.boxShadow="0 20px 40px rgba(0,0,0,0.15)";
                }}
                onMouseOut={e=>{
                    e.currentTarget.style.transform="translateY(0px)";
                    e.currentTarget.style.boxShadow="0 10px 25px rgba(0,0,0,0.08)";
                }}
            >

                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div style={{
                        background:color,
                        color:"#fff",
                        padding:"12px",
                        borderRadius:"12px"
                    }}>
                        {icon}
                    </div>
                </div>

                <h5 style={{color:"#64748b"}}>{title}</h5>
                <h2 style={{fontWeight:"bold"}}>{value}</h2>

            </div>
        </div>
    );
}

export default AdminDashboard;