import axios from "axios";

const BASE_URL = "http://localhost:8081";

export const getTeachers = () =>
    axios.get(`${BASE_URL}/teacher/all`);

export const getHalls = () =>
    axios.get(`${BASE_URL}/hall/all`);

export const assignDuty = (data) =>
    axios.post(`${BASE_URL}/invigilation/assign`, data);

export const getAssignments = () =>
    axios.get(`${BASE_URL}/invigilation/all`);

export const deleteAssignment = (id) =>
    axios.delete(`${BASE_URL}/invigilation/delete/${id}`);