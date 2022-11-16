import styles from './index.module.scss'
import {useEffect} from "react";
import Link from 'next/link'
import useWindowSize from "../../core/hooks/useWindowSize";
import SocialLink from "../UI/SocialLink";
import Logo from "../UI/Logo";
import NavBar from "../NavBar";
import {useRouter} from "next/router";


function Header({routes, burgerState, setBurgerState, setBurgerStateZIndex = () => {}}) {
    const size = useWindowSize()
    const router = useRouter()
    const mobile = 1220

    useEffect(() => {
        setBurgerState(false)
    }, [router.asPath])

    return (
        <header className={styles.header + ' container'}>
            <div className={styles.header__logoWrp}>
                <Link className={styles.header__img} href={'/'} style={{
                    color: burgerState ? '#000000' : '#ffffff'
                }}>
                    <Logo burgerState={burgerState}/>
                </Link>
                <div style={burgerState?{color:'#000000'}:{}} className={styles.header__text} >
                    <p>— независимое издание, освещающее эстетическую сторону российского футбола</p>
                </div>
            </div>
            {
                mobile >= size.width
                    ? <>
                        <button onClick={() => {
                            if (burgerState) {
                                setBurgerState(false)
                                setTimeout(() => {
                                    setBurgerStateZIndex('2')
                                }, 200)
                            } else {
                                setBurgerStateZIndex('4')
                                setBurgerState(true)
                            }
                        }}
                                className={styles.burgerButton}
                                style={burgerState ? {background: '#000000', color: '#ffffff'} : {}}>
                            {
                                burgerState ? 'Закрыть' : 'Меню'
                            }
                        </button>
                        <div style={burgerState ? {top: '0'} : {top: '-530px'}} className={styles.burgerMenu}>
                            <div style={burgerState ? {opacity: '100%',} : {}} className={styles.burgerMenu__content}>
                                <div style={!burgerState ? {opacity: '0'} : {}} className={styles.burgerMenu__navWrp}>
                                    <NavBar routes={routes}/>
                                </div>


                                <div className={styles.burgerMenu__socialWrp}>
                                    <SocialLink url={'https://www.instagram.com/rafl.media/'} black={true}/>
                                    <SocialLink url={'https://t.me/raflmedia'} black={true}/>
                                    <SocialLink url={'https://vk.com/raflmedia'} black={true}/>
                                    <SocialLink url={'https://www.youtube.com/channel/UC5qMpkZ_Di6whW9C88TF8Tw/videos'} black={true}/>
                                </div>

                            </div>
                        </div>
                    </>
                    : <NavBar routes={routes}/>
            }

        </header>
    )
}

export default Header;