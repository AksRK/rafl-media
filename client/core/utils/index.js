// dd monthName, yyyy
import {ruMonths} from "../mock";
import {useEffect, useState} from "react";
import axios from "axios";

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