import style from './index.module.scss'
import footerLogo from '../../public/footer-logo.svg'
import Link from "next/link";
import Image from 'next/image'
import SocialLink from "../UI/SocialLink";
import styles from "../Header/index.module.scss";
import NavLink from "../UI/NavLink";

function Footer() {

    return (
        <footer className={style.footer + ' container'}>

            <div className={style.footer__logo}>
                <Image src={footerLogo} alt={'RAFL'}/>
            </div>
            <div className={style.footerLinks}>
               <div className={style.footerLinks__el}>
                   <h5 className={style.footerLinks__title}>
                       Меню
                   </h5>
                   <NavLink
                       href={'/'}
                       myClassName={'link'}
                       myActiveClassName={' link_active'}>
                       <span>Медиа</span>
                   </NavLink>
                   <a className={'link'} href="http://rafl.studio/" target="_blank" rel="noreferrer"><span>Студия</span></a>
                   <NavLink
                       href={'/about-project'}
                       myClassName={'link'}
                       myActiveClassName={' link_active'}>
                       <span>О проекте</span>
                   </NavLink>
                   <NavLink
                       href={'/contacts'}
                       myClassName={'link'}
                       myActiveClassName={' link_active'}>
                       <span>Контакты</span>
                   </NavLink>
               </div>
                <div className={style.footerLinks__el}>
                    <h5 className={style.footerLinks__title}>
                        Поддержка
                    </h5>
                    <NavLink
                        href={'/user-license-agreement'}
                        myClassName={'link link_column'}
                        myActiveClassName={' link_active'}>
                        <span>Пользовательское</span>
                        <span>соглашение</span>
                    </NavLink>
                </div>

                <div className={style.footerLinks__social}>
                    <SocialLink url={'https://www.instagram.com/rafl.media/'} black={false}/>
                    <SocialLink url={'https://t.me/raflmedia'} black={false}/>
                    <SocialLink url={'https://vk.com/raflmedia'} black={false}/>
                    <SocialLink url={'https://www.youtube.com/channel/UC5qMpkZ_Di6whW9C88TF8Tw/videos'} black={false}/>
                </div>
            </div>

            <div className={style.footer__extra}>
                Мы расстраиваемся, когда кто-то
                копирует и распространяет материалы сайта без ссылки на источник.
            </div>

            <div className={style.footer__copyright}>
                <div className={style.footer__copyright__el}>
                    Сайт задизайнен и создан
                    <a className={'link link_white'} href="rafl-media-backend/сlient/components/Footer/index#"><span>beans</span></a>
                </div>

            </div>

        </footer>
    )
}

export default Footer;