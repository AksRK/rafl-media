import {createContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = () => {
    const router = useRouter()
    const [isAuth, setIsAuth] = useState(false)
    console.log(isAuth)
    useEffect(() => {
        if (router.pathname.includes('admin')) {
            axios.get(`/api/auth/me`, {
                headers: {Authorization: localStorage.getItem('token')}
            })
                .then((r) => {
                    setIsAuth(true)
                })
                .catch(function (error) {
                    router.push('/admin/auth')
                });
        }
    }, [])

    const signIn = () => {
        setIsAuth(true)
    }

    const signOut = () => {
        setIsAuth(false)
    };

    const renderProvider = (children) => (<AuthContext.Provider value={isAuth}>{children}</AuthContext.Provider>)

    return {
        isAuth,
        renderProvider,
        signIn
    }

};

