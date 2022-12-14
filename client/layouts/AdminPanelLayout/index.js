import styles from './styles.module.scss'
import Header from "../../components/Header";
import {useContext, useState} from "react";
import {AuthContext} from "../../pages/_app";

function AdminPanelLayout({children}) {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const [burgerState, setBurgerState] = useState(false)

    const privateRoutes = [
        // {link: '/admin/panel', name: 'Главная'},
        {link: '/admin/panel/users', name: 'Пользователи'},
        {link: '/admin/panel/posts', name: 'Статьи'},
        {link: '/admin/panel/creators', name: 'Креаторы'},
        {link: '/admin/panel/contacts', name: 'Контакты'},
        {
            link: '/', name: 'Выход', handleClick: () => {
                localStorage.removeItem('token')
                setIsAuth(false)
            }
        },
    ]

    if (!isAuth) {
        return <></>
    }
    return (
        <div className={'container'}>
            <div className={styles.adminP}>
                <Header burgerState={burgerState} setBurgerState={setBurgerState} routes={privateRoutes}/>
                <div className={styles.adminP__editPage}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AdminPanelLayout;