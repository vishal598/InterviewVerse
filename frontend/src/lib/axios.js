import axios from "axios";

let getTokenFunction = null;

export const setTokenGetter = (fn) => {
    getTokenFunction = fn;
};

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

axiosInstance.interceptors.request.use(async (config) => {
    if (getTokenFunction) {
        const token = await getTokenFunction();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }

    return config;
});

export default axiosInstance;