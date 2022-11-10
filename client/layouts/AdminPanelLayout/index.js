import styles from './styles.module.scss'
import Header from "../../components/Header";
import {CheckAuth} from "../../core/utils";
import router from "next/router";
import {useEffect} from "react";

const privateRoutes = [
    {link: '/admin/panel', name: 'Главная'},
    {link: '/admin/panel/posts', name: 'Статьи'},
    {link: '/admin/panel/creators', name: 'Креаторы'},
    {link: '/', name: 'Выход'},
]

function AdminPanelLayout({children}) {
    const auth = CheckAuth()
    console.log(auth)

    useEffect(() => {
        if (!auth) {
            router.push('/admin/auth')
        }
    }, [])

    return (
        <div className={'container'}>
            <div className={styles.adminP}>
                <Header routes={privateRoutes}/>
                <div className={styles.adminP__editPage}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AdminPanelLayout;