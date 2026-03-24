import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaUserPlus } from "react-icons/fa";

function ManageTeachers(){

    const [teachers,setTeachers] = useState([]);
    const [form,setForm] = useState({
        id:null,
        name:"",
        email:"",
        phone:""
    });

    const [isEditing,setIsEditing] = useState(false);

    const fetchTeachers = () => {
        axios.get("http://localhost:8081/teacher/all")
            .then(res=>setTeachers(res.data))
            .catch(()=>setTeachers([]));
    };

    useEffect(()=>{
        fetchTeachers();
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isEditing){
            axios.put(`http://localhost:8081/teacher/update/${form.id}`, form)
                .then(()=>{
                    alert("✅ Teacher updated successfully");
                    resetForm();
                    fetchTeachers();
                });
        }else{
            axios.post("http://localhost:8081/teacher/add", form)
                .then(()=>{
                    alert("🎉 Teacher added successfully");
                    resetForm();
                    fetchTeachers();
                });
        }
    };

    const resetForm = () => {
        setForm({id:null,name:"",email:"",phone:""});
        setIsEditing(false);
    };

    const editTeacher = (teacher) => {
        setForm(teacher);
        setIsEditing(true);
        window.scrollTo({top:0,behavior:"smooth"});
    };

    const deleteTeacher = (id) => {
        if(window.confirm("🗑 Delete this teacher?")){
            axios.delete(`http://localhost:8081/teacher/delete/${id}`)
                .then(()=>fetchTeachers());
        }
    };

    return(
        <div className="container-fluid p-4">

            <h2 style={{fontWeight:"bold"}}>👩‍🏫 Manage Teachers</h2>

            {/* FORM */}
            <div className="card shadow-sm p-4 mb-4">

                <form onSubmit={handleSubmit}>
                    <div className="row">

                        <div className="col-md-3">
                            <label>👤 Name</label>
                            <input
                                className="form-control"
                                placeholder="Enter Name"
                                value={form.name}
                                onChange={e=>setForm({...form,name:e.target.value})}
                                required
                            />
                        </div>

                        <div className="col-md-3">
                            <label>📧 Email</label>
                            <input
                                className="form-control"
                                placeholder="Enter Email"
                                value={form.email}
                                onChange={e=>setForm({...form,email:e.target.value})}
                                required
                            />
                        </div>

                        <div className="col-md-3">
                            <label>📱 Phone No</label>
                            <input
                                className="form-control"
                                placeholder="Enter Phone No"
                                value={form.phone}
                                onChange={e=>setForm({...form,phone:e.target.value})}
                                required
                            />
                        </div>

                        <div className="col-md-3 d-flex align-items-end">
                            <button
                                className="btn w-100"
                                title={isEditing ? "Update Teacher" : "Add Teacher"}
                                style={{
                                    background:"#3b82f6",
                                    color:"white",
                                    border:"none",
                                    borderRadius:"8px",
                                    fontWeight:"600"
                                }}
                            >
                                <FaUserPlus/>
                            </button>
                        </div>

                    </div>
                </form>
            </div>

            {/* TABLE */}
            <div className="card shadow-sm p-3">

                <h6>📋 Teacher List</h6>

                <table className="table table-hover mt-3">
                    <thead className="table-light">
                    <tr>
                        <th>👤 Name</th>
                        <th>📧 Email</th>
                        <th>📱 Phone No</th>
                        <th style={{width:"120px"}}>⚙ Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {teachers.map(t=>(
                        <tr key={t.id}>
                            <td><b>{t.name}</b></td>
                            <td>{t.email}</td>
                            <td>{t.phone}</td>

                            <td>
                                <button
                                    onClick={()=>editTeacher(t)}
                                    title="✏ Edit"
                                    style={{
                                        background:"#f59e0b",
                                        color:"white",
                                        border:"none",
                                        padding:"6px 10px",
                                        borderRadius:"8px",
                                        marginRight:"8px"
                                    }}
                                >
                                    <FaEdit/>
                                </button>

                                <button
                                    onClick={()=>deleteTeacher(t.id)}
                                    title="🗑 Delete"
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
                    ))}
                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default ManageTeachers;