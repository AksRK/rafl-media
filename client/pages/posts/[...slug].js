import Link from "next/link";
import ShrinkText from "../../components/UI/ShrinkText/ShrinkText";
import hand from '../../public/hand-black.svg'
import useWindowSize from "../../core/hooks/useWindowSize";
import styles from './index.module.scss'
import Image from 'next/image'
import Liked from "../../components/UI/Liked";
import {formatRuDate} from "../../core/utils";
import {NextSeo} from "next-seo";
import {useInView} from "react-intersection-observer";
import SeeMore from "../../components/UI/SeeMore";
import {useEffect} from "react";
import {useRouter} from "next/router";


export default function FullPost({post}) {
    const size = useWindowSize()
    const mobile = 479;
    const router = useRouter()
    const { ref, inView, entry } = useInView({
        /* Optional options */
        threshold: 1,
        rootMargin: '2000px 0px -18px 0px'
    });

    useEffect(() => {
        if (post.message) {
            router.push('/')
        }
    }, [])

    return (
        <>
            <NextSeo
                title={`RAFL - ${post.title}`}
                description={post.description}
                openGraph={{
                    title: `RAFL - ${post.title}`,
                    description: post.description,
                    images: [{
                        url: `/api${post?.imageUrl?.url}`,
                        width: 300,
                        height: 300,
                        alt: `RAFL - ${post.title}`,
                    }]
                }}
            />
            <section className={styles.fullPost}>
                    <div className={styles.fullPost__moreWrp}>
                        <SeeMore category={'Комьюнити'}
                                 authorName={post?.title} linksArray={post.postsAlso} activeTitle={post.title}/>
                    </div>
                    <span className={styles.fullPost__date}>
                        {formatRuDate(post?.createdAt)}
                    </span>
                <div className={styles.fullPost__head}>
                    <h2 className={'page-title page-title--full-post'}>
                        {post?.title?.replace(': ', ':\n')}
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
                    </div>
                </div>
                <br/>
                <div className={styles.btnBox} id={"likeBox"} ref={ref}>
                    <Liked likes={post?.likes} postId={post._id} typePost={'creator'} likeFix={inView}/>
                    {/*<button className={'share-btn'}>Поделиться статьей</button>*/}
                </div>
                <br/>
                <hr/>
                <div className={styles.fullPost__wrp}>
                    {
                        post.readAlsoList?.length >= 1
                            ?<div className={styles.readAlso}>

                                <h4 className={styles.readAlso__title}>
                                    Читайте также:
                                </h4>
                                {
                                    post.readAlsoList?.map((post) => {
                                        return (
                                            <Link key={post._id} href={`/posts/${post.creator}/${post.titleUrl}`} className={styles.readAlsoCard}>
                                                <div className={styles.readAlsoCard__el}>
                                                    <div>
                                                        <h5 className={styles.readAlsoCard__title}>
                                                            {
                                                                mobile >= size.width
                                                                    ?<ShrinkText
                                                                        maxChar={24}
                                                                        text={post.title}
                                                                    />
                                                                    :post.title
                                                            }
                                                        </h5>
                                                        <p className={styles.readAlsoCard__description}>
                                                            <ShrinkText
                                                                maxChar={mobile >= size.width ?50:100}
                                                                text={post.description}/>
                                                        </p>
                                                    </div>
                                                    <div className={styles.readAlsoCard__likes}>
                                                        <Image src={hand} alt={'hand'}/>
                                                        <span>{post.likes}</span>
                                                    </div>
                                                </div>
                                                <div className={styles.readAlsoCard__img}>
                                                    <Image src={post.imageUrl.fullUrl} alt={post.title} width={150} height={100}/>
                                                </div>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                            :''
                    }
                </div>
            </section>
        </>
    )
}


export async function getServerSideProps(context) {
    const post = await fetch(`http://localhost:3000/api/creator/posts/title/${context.params.slug[1]}`).then(r => r.json())

    return {
        props: {post: post}, // will be passed to the page component as props
    }
}