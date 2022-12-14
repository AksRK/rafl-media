import styles from './index.module.scss'
import {useEffect, useState} from "react";
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
    const [btnState, setBtnState] = useState(false)

    useEffect(() => {
        setBurgerState(false)
    }, [router.asPath])

    useEffect(() => {
        setBtnState(true)
        setTimeout(()=> {
            setBtnState(false)
        }, 250)
    }, [burgerState])

    return (
        <header className={styles.header + ' container'} style={router.asPath.includes('posts/') && !router.asPath.includes('admin/') ? {
            maxWidth: '1200px',
            margin: '0'
        } : {}}>
            {
                burgerState
                    ? <div className="backdrop"></div>
                    : <></>
            }
            <div className={styles.header__logoWrp}>
                <Link className={styles.header__img} href={'/'} style={{
                    color: burgerState ? '#000000' : '#ffffff'
                }}>
                    <Logo burgerState={burgerState}/>
                </Link>
                <div style={burgerState?{color:'#000000'}:{}} className={styles.header__text} >
                    <p>независимое издание, освещающее эстетическую сторону российского футбола</p>
                </div>
            </div>
            {
                !!size.width
                    ? <>
                        {
                            mobile >= size.width
                                ? <>
                                    <button disabled={btnState} onClick={() => {
                                        if (burgerState) {
                                            document.querySelector('body').style.overflow = 'visible'
                                            setBurgerState(false)
                                            setTimeout(() => {
                                                setBurgerStateZIndex('2')
                                            }, 200)
                                        } else {
                                            document.querySelector('body').style.overflow = 'hidden'
                                            setBurgerStateZIndex('5')
                                            setBurgerState(true)
                                        }
                                    }}
                                            className={styles.burgerButton}
                                            style={burgerState ? {background: '#000000', color: '#ffffff', width:'106px'} : {width:'85px'}}>
                                        {
                                            burgerState ? 'Закрыть' : 'Меню'
                                        }
                                    </button>
                                    <div style={burgerState ? {top: '0'} : {top: '-530px'}} className={styles.burgerMenu}>
                                        <div style={burgerState ? {opacity: '100%',} : {}} className={styles.burgerMenu__content}>
                                            <div style={!burgerState ? {opacity: '0'} : {}} className={styles.burgerMenu__navWrp}>
                                                <NavBar routes={routes} setBurgerState={setBurgerState} setBurgerStateZIndex={setBurgerStateZIndex}/>
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
                                : <NavBar routes={routes} setBurgerStateZIndex={setBurgerStateZIndex}/>
                        }
                        </>
                    : <></>
            }
        </header>
    )
}

export default Header;