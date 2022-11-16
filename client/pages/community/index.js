import {NextSeo} from "next-seo";
import Card from "../../components/Card";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import styles from "../../components/CardsList/index.module.scss";
import SkeletonComunity from "../../components/UI/SkeletonComunity";

export default function Community({creators}) {
    const [loading, setLoading] = useState(true)
    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 500)
    }, [router.asPath])
    return (
        <>
            <NextSeo
                title='Rafl - Комьюнити'
                description='Независимое издание, освещающее эстетическую сторону российского футбола'
                openGraph={{
                    title: 'Rafl - Комьюнити',
                    description: 'Независимое издание, освещающее эстетическую сторону российского футбола'
                }}
            />
            <div className={styles.cardsList}>
                {
                    loading
                        ? <SkeletonComunity/>
                        : <>
                            {
                                creators.docs.map(c =>
                                    <Card type={'creator'}
                                          key={c._id}
                                          title={c.fullName}
                                          description={c.description}
                                          imgUrl={c.imageUrl.fullUrl}
                                          path={`/community/${c.login}`}/>
                                )
                            }
                        </>
                }
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const creators = await fetch(`http://localhost:80/api/creator/`).then(r => r.json())
    return {
        props: {creators: creators}, // will be passed to the page component as props
    }
}