import React from 'react';
import styles from "../Header/index.module.scss";
import NavLink from "../UI/NavLink";

const NavBar = ({routes, setBurgerStateZIndex}) => {
    return (
        <nav className={styles.headerNav}>
            {routes.map(r =>
                <NavLink
                    key={r.link}
                    href={r.link}
                    handleClick={() => {
                        if (r.handleClick) {
                            r.handleClick()
                        }
                        document.querySelector('body').style.overflow = 'visible'
                        setTimeout(() => {
                            setBurgerStateZIndex('2')
                        }, 700)
                    }}
                    myClassName={styles.headerNav__link}
                    myActiveClassName={styles.headerNav__link_active}>
                    <span>{r.name}</span>
                </NavLink>
            )}
        </nav>
    );
};

export default NavBar;