import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaWhatsapp, FaCalendarAlt, FaCheckCircle, FaClock } from "react-icons/fa";

function TeacherDashboard({ teacher }) {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get("http://localhost:8081/invigilation/all")
            .then(res => {
                const myData = res.data.filter(i => i.teacher?.id === teacher.id);
                setData(myData);
            });
    };

    const getStatus = (inv) => {
        const now = new Date();
        const examDateTime = new Date(`${inv.startDate}T${inv.endTime}`);
        return examDateTime < now ? "Completed" : "Upcoming";
    };

    const upcoming = data.filter(i => getStatus(i) === "Upcoming");
    const completed = data.filter(i => getStatus(i) === "Completed");

    const joinWhatsapp = () => {
        window.open(
            "https://api.whatsapp.com/send?phone=14155238886&text=join%20relationship-quite",
            "_blank"
        );
    };

    return (
        <div className="container-fluid p-4">

            {/* WELCOME */}
            <h2 style={{fontWeight:"bold"}}>👩‍🏫 Welcome, {teacher.name}</h2>
            <p className="text-muted">Here is your invigilation schedule and updates.</p>

            {/* WHATSAPP CARD */}
            <div
                className="card shadow-sm p-4 mb-4"
                style={{
                    borderLeft:"6px solid #25D366",
                    background:"#f0fdf4"
                }}
            >
                <h5 style={{color:"#16a34a"}}>
                    <FaWhatsapp/> Enable WhatsApp Alerts
                </h5>

                <p className="text-muted">
                    Stay updated with invigilation duties and get reminders instantly
                    on WhatsApp before exam time.
                </p>

                <button
                    onClick={joinWhatsapp}
                    style={{
                        background:"#25D366",
                        color:"white",
                        border:"none",
                        padding:"10px 16px",
                        borderRadius:"8px",
                        fontWeight:"600",
                        width:"220px"
                    }}
                >
                    <FaWhatsapp/> Join Notifications
                </button>
            </div>

            {/* UPCOMING */}
            <div className="card shadow-sm p-3 mb-4">
                <h5 style={{color:"#2563eb"}}>
                    <FaClock/> Upcoming Invigilations
                </h5>

                <table className="table table-hover mt-3">
                    <thead className="table-light">
                    <tr>
                        <th>📘 Subject</th>
                        <th>🏫 Hall</th>
                        <th>📅 Date</th>
                        <th>⏰ Time</th>
                        <th>Status</th>
                    </tr>
                    </thead>

                    <tbody>
                    {upcoming.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center">
                                😎 No upcoming duties
                            </td>
                        </tr>
                    )}

                    {upcoming.map(inv => (
                        <tr key={inv.id}>
                            <td><b>{inv.examName}</b></td>
                            <td>{inv.hall?.hallName}</td>
                            <td>{inv.startDate}</td>
                            <td>{inv.startTime} - {inv.endTime}</td>
                            <td>
                                <span className="badge bg-primary">
                                    Upcoming
                                </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* COMPLETED */}
            <div className="card shadow-sm p-3">
                <h5 style={{color:"#16a34a"}}>
                    <FaCheckCircle/> Completed Invigilations
                </h5>

                <table className="table table-hover mt-3">
                    <thead className="table-light">
                    <tr>
                        <th>📘 Subject</th>
                        <th>🏫 Hall</th>
                        <th>📅 Date</th>
                        <th>⏰ Time</th>
                        <th>Status</th>
                    </tr>
                    </thead>

                    <tbody>
                    {completed.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center">
                                No completed duties
                            </td>
                        </tr>
                    )}

                    {completed.map(inv => (
                        <tr key={inv.id}>
                            <td><b>{inv.examName}</b></td>
                            <td>{inv.hall?.hallName}</td>
                            <td>{inv.startDate}</td>
                            <td>{inv.startTime} - {inv.endTime}</td>
                            <td>
                                <span className="badge bg-success">
                                    Completed
                                </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default TeacherDashboard;