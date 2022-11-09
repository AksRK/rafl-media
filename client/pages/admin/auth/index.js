import styles from './index.module.scss'
import {useForm} from 'react-hook-form';
import {useState} from "react";

function Auth() {
    const [isAuth, setIsAuth] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: 'test2@test.com',
            password: '123456'
        }
    });

    const onSubmit = () => {
        setIsAuth(true)
    }

    return (
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
    )
}

export default Auth;