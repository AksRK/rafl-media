import styles from './index.module.scss'
import {NextSeo} from "next-seo";

export default function Contacts() {

    return (
        <>
            <NextSeo
                title={`RAFL - Контакты`}
                openGraph={{
                    title: `RAFL - Контакты`,
                }}
            />
            <div className={styles.contacts}>
                <h2 className={'page-title'}>Контакты</h2>

                <div className={styles.contacts__wrp}>
                    <div className={styles.contacts__el}>
                        <span>Insta:</span>
                        <a className={'link link_hover_black'} href={'https://instagram.com/rafl.studio'}
                           target="_blank" rel="noreferrer">
                            <span>instagram.com/rafl.studio</span>
                        </a>
                    </div>
                    <div className={styles.contacts__el}>
                        <span>TG:</span>
                        <a className={'link link_hover_black'} href={'https://t.me/igorselenov'} target="_blank"
                           rel="noreferrer">
                            <span>t.me/igorselenov</span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}