import styles from './styles.module.scss'
import NavLink from "../../components/UI/NavLink";

export default function HomeLayout({children}) {
    return (
        <section className={styles.content}>
            <div className={styles.wrpTags}>
                <nav className={styles.navTags}>
                    <NavLink href={'/community'}
                             myClassName={styles.navTags__link}
                             myActiveClassName={styles.navTags__link_active}
                             scroll={false}
                    >
                        Комьюнити
                    </NavLink>
                    <span className={styles.navTags__separator}/>
                    <NavLink href={'/'}
                             myClassName={styles.navTags__link}
                             myActiveClassName={styles.navTags__link_active}
                             scroll={false}
                    >
                        Все статьи
                    </NavLink>
                    <NavLink href={'/interview'}
                             myClassName={styles.navTags__link}
                             myActiveClassName={styles.navTags__link_active}
                             scroll={false}
                    >
                        Интервью
                    </NavLink>
                    <NavLink href={'/video'}
                             myClassName={styles.navTags__link}
                             myActiveClassName={styles.navTags__link_active}
                             scroll={false}
                    >
                        Видео
                    </NavLink>
                    <NavLink href={'/cards'}
                             myClassName={styles.navTags__link}
                             myActiveClassName={styles.navTags__link_active}
                             scroll={false}
                    >
                        Карточки
                    </NavLink>
                </nav>
            </div>

            {children}
        </section>
    )
}