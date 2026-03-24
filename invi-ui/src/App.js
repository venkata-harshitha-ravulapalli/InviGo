import React, { useState } from "react";
import { FaUserShield, FaChalkboardTeacher, FaTasks, FaSchool, FaEye, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AssignDuty from "./pages/AssignDuty";
import ManageTeachers from "./pages/ManageTeachers";
import ManageHalls from "./pages/ManageHalls";
import ViewInvigilations from "./pages/ViewInvigilations";

function App(){

    const [role,setRole] = useState("");
    const [teacher,setTeacher] = useState(null);
    const [page,setPage] = useState("dashboard");

    const logout = () => {
        setRole("");
        setTeacher(null);
    };

    // PAGE RENDER
    const renderPage = () => {

        if(role==="admin"){
            if(page==="dashboard") return <AdminDashboard/>;
            if(page==="assign") return <AssignDuty/>;
            if(page==="teachers") return <ManageTeachers/>;
            if(page==="halls") return <ManageHalls/>;
            if(page==="viewInv") return <ViewInvigilations/>;
        }

        if(role==="teacher"){
            return <TeacherDashboard teacher={teacher}/>;
        }

        return null;
    };

    // LOGIN PAGE
    if(role===""){
        return (
            <Login
                setRole={setRole}
                setTeacher={setTeacher}
            />
        );
    }

    return(
        <div className="d-flex">

            {/* SIDEBAR */}
            <div
                style={{
                    width:"240px",
                    background:"linear-gradient(180deg,#0f172a,#020617)",
                    color:"#fff",
                    minHeight:"100vh",
                    padding:"20px",
                    boxShadow:"4px 0 10px rgba(0,0,0,0.3)"
                }}
            >

                <h3 className="mb-4 text-center" style={{fontWeight:"bold",letterSpacing:"1px"}}>
                    🎓 INVIGO
                </h3>

                {role==="admin" && (
                    <>
                        <SidebarBtn icon={<FaTachometerAlt/>} text="Dashboard" active={page==="dashboard"} onClick={()=>setPage("dashboard")}/>
                        <SidebarBtn icon={<FaTasks/>} text="Assign Duty" active={page==="assign"} onClick={()=>setPage("assign")}/>
                        <SidebarBtn icon={<FaChalkboardTeacher/>} text="Manage Teachers" active={page==="teachers"} onClick={()=>setPage("teachers")}/>
                        <SidebarBtn icon={<FaSchool/>} text="Manage Halls" active={page==="halls"} onClick={()=>setPage("halls")}/>
                        <SidebarBtn icon={<FaEye/>} text="View Invigilations" active={page==="viewInv"} onClick={()=>setPage("viewInv")}/>
                    </>
                )}

                {role==="teacher" && (
                    <SidebarBtn icon={<FaUserShield/>} text="My Invigilations" active={true} onClick={()=>setPage("dashboard")}/>
                )}

                <hr style={{color:"#aaa"}}/>

                <button
                    className="btn w-100"
                    onClick={logout}
                    style={{
                        background:"#ef4444",
                        color:"#fff",
                        borderRadius:"8px",
                        fontWeight:"bold",
                        padding:"10px",
                        transition:"0.3s"
                    }}
                    onMouseOver={e=>e.target.style.background="#dc2626"}
                    onMouseOut={e=>e.target.style.background="#ef4444"}
                >
                    <FaSignOutAlt/> Logout
                </button>

            </div>

            {/* CONTENT AREA */}
            <div
                className="flex-fill p-4"
                style={{
                    background:"#f1f5f9",
                    minHeight:"100vh"
                }}
            >
                {renderPage()}
            </div>

        </div>
    );
}

/* SIDEBAR BUTTON COMPONENT */
function SidebarBtn({icon,text,onClick,active}){
    return(
        <button
            onClick={onClick}
            style={{
                width:"100%",
                padding:"12px",
                marginBottom:"10px",
                borderRadius:"10px",
                border:"none",
                textAlign:"left",
                fontWeight:"500",
                background: active ? "#2563eb" : "transparent",
                color:"#fff",
                transition:"0.3s",
                display:"flex",
                alignItems:"center",
                gap:"10px"
            }}
            onMouseOver={e=>{
                if(!active) e.target.style.background="#1e293b";
            }}
            onMouseOut={e=>{
                if(!active) e.target.style.background="transparent";
            }}
        >
            {icon} {text}
        </button>
    );
}

export default App;