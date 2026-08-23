import axios from "axios";



const api = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    // baseURL: "https://ai-node-backend-kgpo.onrender.com/api/v1",
    headers: {
        "Content-Type": "application/json"
    }
});


export default api;