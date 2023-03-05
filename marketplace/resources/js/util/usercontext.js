import React from 'react';
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import user from './user';

export const userCon = createContext();

export const axiosconn = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    // baseURL: 'http://mavmarket.rxr8071.uta.cloud/api/',
});

export const UserProvider = ({ children }) => {

    const [waitPeriod, setWait] = useState(false);

    const registerNewUser = async (userData) => {
        setWait(true);
        let data = {success: false,message: ''};
        try {
        const ipdata = JSON.stringify(userData);
        console.log(ipdata);
            data  = await axiosconn.post('auth/register', ipdata, {
            headers: {
                'Content-Type': 'application/json',
            }
            });
            setWait(false);
        }
        catch (err) {
            setWait(false);
            data = {
                success: false, 
                message: 'Server Error!',
            }
        }
        return data;
    }

    const updatePassword = async (userData) => {
        setWait(true);
        try {
            const ipdata = JSON.stringify(userData);
            console.log(ipdata);
            const { data } = await axiosconn.post('auth/updatePassword', ipdata, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setWait(false);
            return data;
        }
        catch (err) {
            setWait(false);
            return { success: false, message: 'Server Error!' };
        }
    }

    const login = async (formData) => {
        setWait(true);
        try {
            const ipdata = JSON.stringify(formData);
            console.log(ipdata);
            const { data } = await axiosconn.post('auth/login', ipdata, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (data.success) {
                user.authenticated(data.data);
                setWait(false);
                return { success: 1 };
            }
            setWait(false);
            return { success: 0, message: data.message };
        }
        catch (err) {
            setWait(false);
            return { success: 0, message: err.response.data.message };
        }

    }

    // const isUserLoggedIn = async () => {
    //     const loginToken = localStorage.getItem('token');
    //     if (loginToken) {
    //         const { data } = await axiosconn.get('auth/getUser', {
    //             headers: {
    //                 'Authorization': 'Bearer ' + loginToken,
    //             }
    //         });
    //         if (data.success && data.user) {
    //             setUser(data.user);
    //             localStorage.setItem("uid", data.user.uid);
    //             return data.user;
    //         }
    //         setUser(null);
    //     }
    // }

    // useEffect(() => {
    //     async function asyncCall() {
    //         await isUserLoggedIn();
    //     }
    //     asyncCall();
    // }, []);

    const logout = () => {
        const loginToken = localStorage.getItem('token');
        console.log(loginToken);
        if (loginToken) {
            axiosconn.post('auth/logout', null, {
                headers: {
                    'Authorization': 'Bearer ' + loginToken,
                }
            })
                .then(() => {
                    user.logout();
                })
                .catch(() => {

                });
        }
    }

    return (
        <userCon.Provider value={{ registerNewUser, updatePassword, login, waitPeriod, logout }}>
            {children}
        </userCon.Provider>
    );

}

export default UserProvider;