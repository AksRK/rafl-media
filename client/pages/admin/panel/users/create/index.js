import AdminPanelLayout from "../../../../../layouts/AdminPanelLayout";
import {useForm} from 'react-hook-form';
import styles from "./index.module.scss";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import { ToastContainer, } from 'react-toastify';
import {useRouter} from "next/router";
import {alert} from "../../../../../core/utils";


function NewUser() {
    const [passwordState, setPasswordState] = useState(false)
    const inputPasswordRef = useRef()

    const { register,watch, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            fullName: '',
            email:'',
            password:''
        }
    });
    const router = useRouter()

    const onSubmit = (data) => {
        axios.post(
            `/api/auth/register`,
            {...data},
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }
        ).then((response) => {
            if (response) {
                alert('Пользователь добавлен!', 'success')
                setTimeout(() => {
                    router.push('/admin/panel/users')
                }, 3000)
            }
        }).catch((error) => {
            if (error.response) {
                error.response.data?.map((er) => {
                    alert(er.msg || er.message, 'error')
                })
            }
        })
    }

    const changePasswordView = () => {
        const input = document.querySelector('#password')
        if (passwordState) {
            input.type = 'text'
        }else {
            input.type = 'password'
        }
    }

    return (
        <AdminPanelLayout>
            <ToastContainer/>

            <div className="container-admin">
                <h1>Новый пользователь</h1>

                <br/><br/>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.newPostFormWrp}>
                        <div style={{flexGrow: 1}}>
                            <div className={styles.newPostForm__controller}>
                                <label className={styles.newPostForm__label}
                                       htmlFor={'fullName'}>
                                    Полное имя пользователя
                                </label>
                                <input
                                    className={styles.newPostForm__input}
                                    placeholder={'Имя пользователя'}
                                    name={'fullName'}
                                    id={'fullName'}
                                    {...register("fullName",
                                        {required: true, minLength: 5, maxLength: 80})}
                                    style={errors.title ? {borderColor: 'red', background: '#ffc8c8'} : {}}
                                />
                            </div>
                            <div className={styles.newPostForm__controller}>
                                <label className={styles.newPostForm__label}
                                       htmlFor={'email'}>
                                    Email
                                </label>
                                <input
                                    className={styles.newPostForm__input}
                                    placeholder={'Почта'}
                                    name={'email'}
                                    id={'email'}
                                    {...register("email",
                                        {required: true, minLength: 5, maxLength: 200})}
                                    style={errors.description ? {borderColor: 'red', background: '#ffc8c8'} : {}}
                                />
                            </div>
                            <div className={styles.newPostForm__controller}>
                                <label className={styles.newPostForm__label}
                                       htmlFor={'password'}>
                                    Пароль
                                </label>
                                <input
                                    className={styles.newPostForm__input}
                                    ref={inputPasswordRef}
                                    type={'password'}
                                    placeholder={'Пароль'}
                                    name={'password'}
                                    id={'password'}
                                    {...register("password",
                                        {required: true, minLength: 5, maxLength: 200})}
                                    style={errors.description ? {borderColor: 'red', background: '#ffc8c8'} : {}}
                                />
                                <div className={'btn'} style={{padding:'10px 15px'}}
                                     onClick={()=> {
                                         setPasswordState(!passwordState)
                                         changePasswordView()
                                     }}>
                                    {
                                        passwordState?'Скрыть пароль':'Сделать пароль видимым'
                                    }
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className={styles.newPostForm__wrpBtn}>
                        <input className={'btn'} type={'submit'} value={'Создать'}/>
                    </div>
                    <div style={{height:'100px'}}></div>
                </form>
            </div>
        </AdminPanelLayout>
    )
}

export default NewUser;