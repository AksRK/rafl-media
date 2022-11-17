import styles from './index.module.scss'
import {useForm} from 'react-hook-form';
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import Header from "../../../components/Header";
import {publicRoutes} from "../../../layouts/DefaultLayout";
import {AuthContext} from "../../_app";

function Auth() {
    const router = useRouter()
    const [burgerState, setBurgerState] = useState(false)
    const { setIsAuth } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: 'test2@test.com',
            password: '123456'
        }
    });

    const onSubmit = async (data) => {
        await axios.post(`/api/auth/login`, {
            ...data
        })
            .then(function (response) {
                if (response.status === 200) {
                    localStorage.setItem('token', response.data.token)
                    setIsAuth(true)
                    router.push('/admin/panel/posts')
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    useEffect(() => {
        axios.get(`/api/auth/me`, {
            headers: {Authorization: localStorage.getItem('token')}
        })
            .then(function (response) {
                setIsAuth(true)
                router.push('/admin/panel/posts')
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    return (
        <>
            <Header routes={publicRoutes} burgerState={burgerState} setBurgerState={setBurgerState}/>
            <section className={styles.auth}>

                <form onSubmit={handleSubmit(onSubmit)} className={styles.authForm}>
                    <h2 className={styles.authForm__title}>Вход</h2>

                    <div className={styles.authForm__control}>
                        <input type="text"
                               name={'email'}
                               id={'email'}
                               placeholder={'Почта'}
                               {...register("email",
                                   {required: true, minLength: 5, maxLength: 80})}
                               className={styles.authForm__input}
                               style={errors.email?{borderColor:'red', background:'#ffc8c8'}:{}}
                        />
                        <input type="password"
                               name={'password'}
                               id={'password'}
                               placeholder={'Пароль'}
                               {...register("password",
                                   {required: true, minLength: 5, maxLength: 80})}
                               className={styles.authForm__input}
                               style={errors.password?{borderColor:'red', background:'#ffc8c8'}:{}}
                        />
                    </div>
                    <input className={styles.authForm__button} type={'submit'} value={'Войти'}/>
                </form>
            </section>
        </>
    )
}

export default Auth;