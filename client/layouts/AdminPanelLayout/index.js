import styles from './styles.module.scss'
import Header from "../../components/Header";

const privateRoutes = [
    {link: '/admin/panel', name: 'Главная'},
    {link: '/admin/panel/posts', name: 'Статьи'},
    {link: '/admin/panel/creators', name: 'Креаторы'},
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