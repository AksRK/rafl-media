import React from 'react';
import styles from "../Header/index.module.scss";
import NavLink from "../UI/NavLink";

const NavBar = ({routes}) => {
    return (
        <nav className={styles.headerNav}>
            {routes.map(r =>
                <NavLink
                    key={r.link}
                    href={r.link}
                    handleClick={r.handleClick}
                    myClassName={styles.headerNav__link}
                    myActiveClassName={styles.headerNav__link_active}>
                    <span>{r.name}</span>
                </NavLink>
            )}
        </nav>
    );
};

export default NavBar;