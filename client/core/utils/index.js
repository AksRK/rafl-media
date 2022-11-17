// dd monthName, yyyy
import {ruMonths} from "../mock";
import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

export const formatRuDate = (dt) => {
    dt = new Date(dt)
    return `${dt.getDate()} ${ruMonths[dt.getMonth()]} ${dt.getFullYear()} г.`;
}

export const CheckAuth = () => {
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        axios.get(`/api/auth/me`, {
            headers: {Authorization: localStorage.getItem('token')}
        })
            .then(function (response) {
                setIsAuth(true)
            })
            .catch(function (error) {
                setIsAuth(false)
            });
    }, [])

    return isAuth
}

export const alert = (msg, type) => {
    if (type === 'error') {
        toast.error(msg, {
            position: "bottom-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }else if (type === 'success') {
        toast.success(msg, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }
}