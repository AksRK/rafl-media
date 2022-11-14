import style from './index.module.scss'
import footerLogo from '../../public/footer-logo.svg'
import Link from "next/link";
import Image from 'next/image'
import SocialLink from "../UI/SocialLink";

function Footer() {

    return (
        <footer className={style.footer}>

            <div className={style.footer__logo}>
                <Image src={footerLogo} alt={'RAFL'}/>
            </div>
            <div className={style.footerLinks}>
               <div className={style.footerLinks__el}>
                   <h5 className={style.footerLinks__title}>
                       Меню
                   </h5>
                   <Link className={'link'} href={'/'}><span>Медиа</span></Link>
                   <Link className={'link'} href={'/'}><span>Студия</span></Link>
                   <Link className={'link'} href={'/about-project'}><span>О проекте</span></Link>
                   <Link className={'link'} href={'/contacts'}><span>Контакты</span></Link>
               </div>
                <div className={style.footerLinks__el}>
                    <h5 className={style.footerLinks__title}>
                        Поддержка
                    </h5>
                    <Link className={'link link_column'} href={'/user-license-agreement'}>
                        <span>Пользовательское</span>
                        <span>соглашение</span>
                    </Link>
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