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
import {Category} from "../../core/mock";
import {formatRuDate} from "../../core/utils";


export default function FullPost({post}) {
    const size = useWindowSize()
    const mobile = 479;

    return (
        <DefaultLayout bannerState={false}>
            <MyMain post={true}>
                <section className={styles.fullPost}>
                    <div className={styles.fullPost__moreWrp}>
                        <SeeMore category={Category.find((c) => c.value === post?.category)?.label}
                                 authorName={post?.title}/>
                    </div>
                    <span className={styles.fullPost__date}>
                        {formatRuDate(post?.createdAt)}
                    </span>
                    <div className={styles.fullPost__head}>
                        <h2 className={'page-title page-title--full-post'}>
                            {post?.title.replace(':', ':\n')}
                        </h2>
                        <span className={styles.fullPost__description}>
                           {post?.description}
                        </span>
                        <div className={styles.fullPost__titleImg}>
                            <Image src={post?.imageUrl?.fullUrl} alt="" width={800} height={800}/>
                        </div>
                    </div>


                    <div className={styles.fullPost__wrp}>

                        <div className={styles.fullPost__content}>
                            <div className={'sun-editor-editable sun-editor-editable--content'}
                                 dangerouslySetInnerHTML={{__html: post?.content}}/>

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
                                <Liked likes={post?.likes}/>
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


export async function getServerSideProps(context) {
    const post = await fetch(`http://localhost:3000/api/creator/posts/title/${context.params.slug[1]}`).then(r => r.json())

    return {
        props: {post: post}, // will be passed to the page component as props
    }
}