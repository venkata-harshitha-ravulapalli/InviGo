import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlusCircle, FaUsers } from "react-icons/fa";

function ManageHalls(){

    const [halls,setHalls] = useState([]);
    const [form,setForm] = useState({
        id:null,
        block:"",
        room:"",
        capacity:""
    });

    const [isEditing,setIsEditing] = useState(false);

    useEffect(()=>{
        fetchHalls();
    },[]);

    const fetchHalls = () => {
        axios.get("http://localhost:8081/hall/all")
            .then(res=>{
                const sorted = sortHalls(res.data);
                setHalls(sorted);
            })
            .catch(()=>setHalls([]));
    };

    const sortHalls = (hallList) => {
        return hallList.sort((a,b)=>{
            const aParts = a.hallName.split("- Room ");
            const bParts = b.hallName.split("- Room ");

            const blockA = aParts[0].trim();
            const blockB = bParts[0].trim();

            if(blockA !== blockB){
                return blockA.localeCompare(blockB);
            }

            const roomA = parseInt(aParts[1]);
            const roomB = parseInt(bParts[1]);

            return roomA - roomB;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const combinedHallName = `Block ${form.block} - Room ${form.room}`;

        const payload = {
            hallName: combinedHallName,
            capacity: form.capacity
        };

        if(isEditing){
            axios.put(`http://localhost:8081/hall/update/${form.id}`, payload)
                .then(()=>{
                    alert("✅ Hall updated successfully");
                    resetForm();
                    fetchHalls();
                });
        }else{
            axios.post("http://localhost:8081/hall/add", payload)
                .then(()=>{
                    alert("🎉 Hall added successfully");
                    resetForm();
                    fetchHalls();
                });
        }
    };

    const resetForm = () => {
        setForm({id:null,block:"",room:"",capacity:""});
        setIsEditing(false);
    };

    const editHall = (hall) => {
        const parts = hall.hallName.replace("Block ","").split("- Room ");

        setForm({
            id:hall.id,
            block:parts[0].trim(),
            room:parts[1].trim(),
            capacity:hall.capacity
        });

        setIsEditing(true);
        window.scrollTo({top:0,behavior:"smooth"});
    };

    const deleteHall = (id) => {
        if(window.confirm("🗑 Delete this hall?")){
            axios.delete(`http://localhost:8081/hall/delete/${id}`)
                .then(()=>fetchHalls());
        }
    };

    return(
        <div className="container-fluid p-4">

            <h2 style={{fontWeight:"bold"}}>🏫 Manage Exam Halls</h2>

            {/* FORM */}
            <div className="card shadow-sm p-4 mb-4">
                <form onSubmit={handleSubmit}>
                    <div className="row">

                        <div className="col-md-3">
                            <label>🏢 Block</label>
                            <input
                                className="form-control"
                                value={form.block}
                                onChange={e=>setForm({...form,block:e.target.value})}
                                required
                            />
                        </div>

                        <div className="col-md-3">
                            <label>🚪 Room</label>
                            <input
                                className="form-control"
                                value={form.room}
                                onChange={e=>setForm({...form,room:e.target.value})}
                                required
                            />
                        </div>

                        <div className="col-md-3">
                            <label>👥 Capacity</label>
                            <div className="input-group">
                                <span className="input-group-text"><FaUsers/></span>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={form.capacity}
                                    onChange={e=>setForm({...form,capacity:e.target.value})}
                                    required
                                />
                            </div>
                        </div>

                        {/* ADD BUTTON */}
                        <div className="col-md-3 d-flex align-items-end">
                            <button
                                className="btn w-100"
                                title="➕ Add Hall"
                                style={{
                                    background:"#3b82f6",
                                    color:"white",
                                    border:"none",
                                    borderRadius:"8px",
                                    fontWeight:"600"
                                }}
                            >
                                <FaPlusCircle size={18}/>
                            </button>
                        </div>

                    </div>
                </form>
            </div>

            {/* TABLE */}
            <div className="card shadow-sm p-3">

                <h6>📋 Hall List</h6>

                <table className="table table-hover mt-3">
                    <thead className="table-light">
                    <tr>
                        <th>🏢 Block</th>
                        <th>🚪 Room</th>
                        <th>🏬 Floor</th>
                        <th>👥 Capacity</th>
                        <th>⚙ Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {halls.map(h=>{

                        const parts = h.hallName.replace("Block ","").split("- Room ");
                        const block = parts[0];
                        const room = parts[1];

                        let floor = "-";
                        if(room){
                            if(room.startsWith("1")) floor = "Ground";
                            else if(room.startsWith("2")) floor = "First";
                            else if(room.startsWith("3")) floor = "Second";
                        }

                        return(
                            <tr key={h.id}>
                                <td><b>{block}</b></td>
                                <td>{room}</td>
                                <td>{floor}</td>
                                <td>{h.capacity}</td>

                                <td>
                                    {/* EDIT */}
                                    <button
                                        onClick={()=>editHall(h)}
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

                                    {/* DELETE */}
                                    <button
                                        onClick={()=>deleteHall(h.id)}
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
                        )
                    })}
                    </tbody>

                </table>
            </div>

        </div>
    );
}

export default ManageHalls;