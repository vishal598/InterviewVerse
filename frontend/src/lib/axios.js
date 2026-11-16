import axios from "axios"

const axiosInstance =axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    withCredentials:true //brower sends cookies automatically on every request
})


export default axiosInstance;