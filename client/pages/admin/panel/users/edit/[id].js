import AdminPanelLayout from "../../../../../layouts/AdminPanelLayout";
import {useForm} from 'react-hook-form';
import styles from "./index.module.scss";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import {useRouter} from "next/router";
import {alert} from "../../../../../core/utils";


function EditUser({id, user}) {
    const { register,watch, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            fullName: user.fullName,
            email: user.email,
        }
    });
    const router = useRouter()


    const onSubmit = (data) => {
        axios.put(
            `/api/admin/users/${id}`,
            {...data},
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }
        ).then((response) => {
            if (response) {
                alert('Данные пользователя обновлены!', 'success')
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

    return (
        <AdminPanelLayout>
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
                                    {...register("fullName")}
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
                                    {...register("email")}
                                    style={errors.description ? {borderColor: 'red', background: '#ffc8c8'} : {}}
                                />
                            </div>
                        </div>
                    </div>


                    <div className={styles.newPostForm__wrpBtn}>
                        <input className={'btn'} type={'submit'} value={'Сохранить'}/>
                    </div>
                    <div style={{height:'100px'}}></div>
                </form>
            </div>
        </AdminPanelLayout>
    )
}

export async function getServerSideProps(context) {
    const user = await fetch(`http://localhost:3000/api/admin/users/${context.params.id}`)
        .then(res => res.json())

    return {
        props: {id: context.params.id, user }, // will be passed to the page component as props
    }
}

export default EditUser;