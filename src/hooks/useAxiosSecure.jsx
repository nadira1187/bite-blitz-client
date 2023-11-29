import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useEffect } from "react";

const axiosSecure = axios.create({
    baseURL: 'https://byte-blitz-server.vercel.app'
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();

    useEffect(() => {
        // Request interceptor to add authorization header for every secure call to the API
        axiosSecure.interceptors.request.use(function (config) {
            const token = localStorage.getItem('access-token');
           // console.log('Token:', token);
            config.headers.authorization = `Bearer ${token}`;
           // console.log('Authorization Header:', config.headers.authorization);

            return config;
        }, function (error) {
            return Promise.reject(error);
        });

        // Response interceptor to handle 401 and 403 errors
        axiosSecure.interceptors.response.use(function (response) {
            return response;
        }, async (error) => {
            const status = error.response.status;
            console.log(status)
            // if (status === 401 || status === 403) {
            //     await logOut();
            //     navigate('/login');
            // }
            return Promise.reject(error);
        });
    }, [logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;
