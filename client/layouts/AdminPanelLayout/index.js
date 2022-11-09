import styles from './styles.module.scss'
import Header from "../../components/Header";

const privateRoutes = [
    {link: '/admin/panel', name: 'Главная'},
    {link: '/admin/panel/new-post', name: 'Создать статью'},
    {link: '/', name: 'Выход'},
]

function AdminPanelLayout({children}) {
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