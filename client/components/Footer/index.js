import style from './index.module.scss'
import footerLogo from '../../public/footer-logo.png'
import Image from 'next/image'
import SocialLink from "../UI/SocialLink";
import NavLink from "../UI/NavLink";
import Link from 'next/link'

function Footer({styled = {}}) {

    return (
        <footer className={style.footer + ' container'} style={styled}>

            <div className={style.footer__wrp}>
                <div className={style.footer__logo}>
                    <Link href={'/'}>
                        <Image src={footerLogo} alt={'RAFL'}/>
                    </Link>

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
                        <a className={'link link_white'} href="https://t.me/German_Bobnev" target={'_blank'} rel={'noreferrer'}><span>beans</span></a>
                    </div>

                </div>
            </div>

        </footer>
    )
}

export default Footer;