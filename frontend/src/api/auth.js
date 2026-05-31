import axios from "axios";
import server from "../environment";
const API = `${server}/api/auth`;

export const registerUser = (data) => {
    return axios.post(`${API}/register`, data);
};

export const loginUser = (data) => {
    return axios.post(`${API}/login`, data);
};