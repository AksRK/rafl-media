import styles from './index.module.scss'
import DefaultLayout from "../../layouts/DefaultLayout";
import {useRouter} from 'next/router'
import MyMain from "../../components/MyMain";

export default function Contacts() {
    const {asPath} = useRouter()

    return (
        <DefaultLayout activePage={asPath} bannerState={false}>
            <MyMain bigPadding={true}>
                <div className={styles.contacts}>
                    <h2 className={'page-title'}>Контакты</h2>

                    <div className={styles.contacts__wrp}>
                        <div className={styles.contacts__el}>
                            <span>Insta:</span>
                            <a className={'link link_hover_black'} href={'https://instagram.com/rafl.studio'}>
                                <span>instagram.com/rafl.studio</span>
                            </a>
                        </div>
                        <div className={styles.contacts__el}>
                            <span>TG:</span>
                            <a className={'link link_hover_black'} href={'https://t.me/igorselenov'}>
                                <span>t.me/igorselenov</span>
                            </a>
                        </div>
                    </div>
                </div>
            </MyMain>
        </DefaultLayout>
    )
}