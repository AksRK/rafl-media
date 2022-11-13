import styles from './index.module.scss'
import HomeLayout from "../../../layouts/HomeLayout";
import MyMain from "../../../components/MyMain";
import DefaultLayout from "../../../layouts/DefaultLayout";
import tstImg from "../../../public/tstImg.jpg";
import SocialLink from "../../../components/UI/SocialLink";
import Image from 'next/image'
import Link from 'next/link'
import useWindowSize from "../../../core/hooks/useWindowSize";
import CardsList from "../../../components/CardsList";

export default function CreatorPage({posts}) {
    const closeImg = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6 6L18 18" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
    const mobile = 479
    const size = useWindowSize()

    return (
        <DefaultLayout>
            <MyMain>
                <HomeLayout>
                    <div className={styles.creatorPage}>
                        <Link href={'/community'} className={'btn btn_tag'}>Игорь селенов {closeImg}</Link>

                        <div className={styles.creator}>
                            <div className={styles.creator__el}>
                                <div className={styles.creator__img}>
                                    <Image src={tstImg} alt={'rafl'}/>
                                </div>
                            </div>
                            <div className={styles.creator__el}>
                                <h3 className={styles.creator__name}>
                                    Игорь Селенов
                                </h3>
                                <div className={styles.creator__infoWrp}>
                                    <span>Основатель RAFL.MEDIA, коллекционер фубольных джерси.</span>
                                    <div className={styles.creator__control}>
                            <span className={styles.creator__subTitle}>
                                Направление деятельности:
                            </span>
                                        <p>
                                            Новые медиа, коллекционирование.
                                        </p>
                                    </div>
                                    <div className={styles.creator__control}>
                            <span className={styles.creator__subTitle}>
                               Справка:
                            </span>
                                        <p>
                                            Последние несколько лет занимается разработкой бренд-стратегий
                                            для крупных российскйи компаний, летом 2021 года вместе с партнером
                                            запустил издания про эстетику русского футбола и стал коллекционировать
                                            уникальные джерси отечественных клубов.
                                        </p>
                                    </div>
                                    <div className={styles.creator__control}>
                            <span className={styles.creator__subTitle}>
                               Соц. сети:
                            </span>
                                        <div className={styles.creator__social}>
                                            <SocialLink url={'https://vk.com'} social={'inst'} black={true}/>
                                            <SocialLink url={'https://vk.com'} social={'vk'} black={true}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <CardsList posts={posts.docs}/>
                    </div>
                </HomeLayout>
            </MyMain>
        </DefaultLayout>
    )
}

export async function getServerSideProps(context) {
    const posts = await fetch(`http://localhost:3000/api/creator/posts/login/${context.params.creatorLogin}`).then(r => r.json())
    return {
        props: {posts: posts}, // will be passed to the page component as props
    }
}