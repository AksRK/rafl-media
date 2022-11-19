import styles from './index.module.scss'
import SocialLink from "../../../components/UI/SocialLink";
import Image from 'next/image'
import Link from 'next/link'
import CardsList from "../../../components/CardsList";
import {NextSeo} from "next-seo";
import {useEffect, useState} from "react";
import axios from "axios";

export default function CreatorPage({posts, creator, next}) {
    const closeImg = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 6L18 18" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

    const [nextPage, setNextPage] = useState(next)
    const [postList, setPostList] = useState(posts)

    function loadMorePosts() {
        axios.get(`/api/creator/posts/login/${creator.login}?page=${nextPage}`,
        ).then(result => {
            setPostList([...postList, ...result.data.docs])
            setNextPage(result.data.nextPage)
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        setPostList(posts)
    }, [posts])

    return (
        <>
            <NextSeo
                title={`Rafl - Комьюнити ${creator.fullName}`}
                description={creator.description}
                openGraph={{
                    title: `Rafl - Комьюнити ${creator.fullName}`,
                    description: creator.description,
                    image: creator?.imageUrl?.fullUrl
                }}
            />
            <div className={styles.creatorPage}>
                <Link href={'/community'} scroll={false} className={'btn btn_tag'}>{creator.fullName} {closeImg}</Link>
                <div className={styles.creator}>
                    <div className={styles.creator__el}>
                        <div className={styles.creator__img}>
                            <Image src={creator.imageUrl.fullUrl} alt={'rafl'} width={190} height={190}/>
                        </div>
                    </div>
                    <div className={styles.creator__el}>
                        <h3 className={styles.creator__name}>
                            {creator.fullName}
                        </h3>
                        <div className={styles.creator__infoWrp}>
                            <span>{creator.about}</span>
                            <div className={styles.creator__control}>
                                        <span className={styles.creator__subTitle}>
                                            Направление деятельности:
                                        </span>
                                <p>
                                    {creator.kindActivity}
                                </p>
                            </div>
                            <div className={styles.creator__control}>
                                        <span className={styles.creator__subTitle}>
                                           Справка:
                                        </span>
                                <p>
                                    {creator.description}
                                </p>
                            </div>
                            {
                                creator.social.length !== 0
                                    ? <div className={styles.creator__control}>
                                                <span className={styles.creator__subTitle}>
                                                   Соц. сети:
                                                </span>
                                        <div className={styles.creator__social}>
                                            {
                                                creator.social.map(s => <SocialLink key={s} url={s} black={true}/>)
                                            }
                                        </div>
                                    </div>
                                    : null
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <CardsList posts={postList} creatorLogin={creator.login}/>
                {
                    nextPage? <button className={'btn'} style={{margin:'50px auto 0 auto'}} onClick={loadMorePosts}>Загрузить еще</button>:''
                }
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const posts = await fetch(`http://localhost:3000/api/creator/posts/login/${context.params.creatorLogin}`).then(r => r.json())
    const creator = await fetch(`http://localhost:3000/api/creator/login/${context.params.creatorLogin}`).then(r => r.json())
    return {
        props: {posts: posts.docs, next: posts.nextPage, creator},
    }
}