import React from 'react';
import styles from "../Header/index.module.scss";
import NavLink from "../UI/NavLink";

const NavBar = ({routes, setBurgerStateZIndex, setBurgerState}) => {
    return (
        <nav className={styles.headerNav}>
            {routes.map(r => {
                if (r.type === 'external') {
                    return (
                        <a key={r.link}
                           href={r.link}
                           target="_blank"
                           rel="nofollow noopener noreferrer"
                           className={styles.headerNav__link}>
                            <span>{r.name}</span>
                        </a>
                    )
                }else {
                    return (
                        <NavLink
                            key={r.link}
                            href={r.link}
                            handleClick={() => {
                                if (r.handleClick) {
                                    r.handleClick()
                                }
                                document.querySelector('body').style.overflow = 'visible'
                                if (setBurgerState) {
                                    setBurgerState(false)
                                }
                                setTimeout(() => {
                                    setBurgerStateZIndex('2')
                                }, 700)
                            }}
                            scroll={r.scroll}
                            myClassName={styles.headerNav__link}
                            myActiveClassName={styles.headerNav__link_active}>
                            <span>{r.name}</span>
                        </NavLink>
                    )
                }
                }
            )}
        </nav>
    );
};

export default NavBar;