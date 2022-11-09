import Link from "next/link";
import ShrinkText from "../../components/UI/ShrinkText/ShrinkText";
import tstImg from '../../public/tstImg.jpg'
import hand from '../../public/hand-black.svg'
import SeeMore from "../../components/UI/SeeMore";
import useWindowSize from "../../core/hooks/useWindowSize";
import DefaultLayout from "../../layouts/DefaultLayout";
import MyMain from "../../components/MyMain";
import styles from './index.module.scss'
import Image from 'next/image'
import Liked from "../../components/UI/Liked";
import {tstText} from "../../core/mock";


export default function FullPost() {
    const size = useWindowSize()
    const mobile = 479

    return (
        <DefaultLayout bannerState={false}>
            <MyMain post={true}>
                <section className={styles.fullPost}>
                    <div className={styles.fullPost__moreWrp}>
                        <SeeMore />
                    </div>
                    <span className={styles.fullPost__date}>
                        1 октября 2022 г.
                    </span>
                    <div className={styles.fullPost__head}>
                        <h1 className={'page-title page-title--full-post'}>Ирина Подшибякина: на равных</h1>
                        <span className={styles.fullPost__description}>
                    Защитница «Локомотива» и Сборной России Ирина Подшибякина о своем пути,
                    восприятии женского футбола и лучших моментах в карьере.
                </span>
                        <div className={styles.fullPost__titleImg}>
                            <Image src={tstImg} alt=""/>
                        </div>
                    </div>


                    <div className={styles.fullPost__wrp}>

                        <div className={styles.fullPost__content}>
                            <div className={'sun-editor-editable sun-editor-editable--content'} dangerouslySetInnerHTML={{__html: tstText}}/>

                        </div>

                        <div className={styles.fullPostFooter}>
                            <div className={styles.fullPostFooter__subscribe}>
                                <span>Подписывайтесь на телеграм-канал </span>
                                <a className={'link link_hover_black'}
                                   href={'https://t.me/raflmedia'}
                                   target="_blank"
                                   rel="nofollow noopener noreferrer">
                                    <span>
                                        Эстетика русского футбола
                                    </span>
                                </a>
                            </div>
                            <div className={styles.fullPostFooter__btnBox}>
                                <Liked/>
                                {/*<button className={'share-btn'}>Поделиться статьей</button>*/}
                            </div>

                        </div>

                        <div className={styles.readAlso}>
                            <h4 className={styles.readAlso__title}>
                                Читайте также:
                            </h4>

                            <Link href={'/'} className={styles.readAlsoCard}>
                                <div className={styles.readAlsoCard__el}>
                                    <div>
                                        <h5 className={styles.readAlsoCard__title}>
                                            {
                                                mobile >= size.width ?
                                                    <ShrinkText
                                                        maxChar={24}
                                                        text={'Владимир Раевский: любить урал'}
                                                    /> :
                                                    ' Владимир Раевский: любить урал'
                                            }
                                        </h5>
                                        <p className={styles.readAlsoCard__description}>
                                            {
                                                mobile >= size.width ?
                                                    <ShrinkText
                                                        maxChar={50}
                                                        text={'«Футбол — уникальный вид человеческой деятельности» журналист Владимир Раевский о любви к «Уралу»'}
                                                    /> :
                                                    '«Футбол — уникальный вид человеческой деятельности» журналист Владимир Раевский о любви к «Уралу»'
                                            }
                                        </p>
                                    </div>
                                    <div className={styles.readAlsoCard__likes}>
                                        <Image src={hand} alt={'hand'}/>
                                        <span>185</span>
                                    </div>
                                </div>
                                <div className={styles.readAlsoCard__img}>
                                    <Image src={tstImg} alt="123"/>
                                </div>
                            </Link>
                            <Link href={'/'} className={styles.readAlsoCard}>
                                <div className={styles.readAlsoCard__el}>
                                    <div>
                                        <h5 className={styles.readAlsoCard__title}>
                                            {
                                                mobile >= size.width ?
                                                    <ShrinkText
                                                        maxChar={24}
                                                        text={'Владимир Раевский: любить урал'}
                                                    /> :
                                                    ' Владимир Раевский: любить урал'
                                            }
                                        </h5>
                                        <p className={styles.readAlsoCard__description}>
                                            {
                                                mobile >= size.width ?
                                                    <ShrinkText
                                                        maxChar={50}
                                                        text={'«Футбол — уникальный вид человеческой деятельности» журналист Владимир Раевский о любви к «Уралу»'}
                                                    /> :
                                                    '«Футбол — уникальный вид человеческой деятельности» журналист Владимир Раевский о любви к «Уралу»'
                                            }
                                        </p>
                                    </div>
                                    <div className={styles.readAlsoCard__likes}>
                                        <Image src={hand} alt={'hand'}/>
                                        <span>185</span>
                                    </div>
                                </div>
                                <div className={styles.readAlsoCard__img}>
                                    <Image
                                        src={tstImg}
                                        alt="123"/>
                                </div>
                            </Link>

                        </div>
                    </div>
                </section>
            </MyMain>
        </DefaultLayout>

    )
}
