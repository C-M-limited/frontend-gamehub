import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    auth: {
        username: "martin.tsang@gmail.com",
        password: "password"
    }
})