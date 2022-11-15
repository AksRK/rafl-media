import {NextSeo} from "next-seo";
import Card from "../../components/Card";
import {useContext, useEffect} from "react";
import {ScrollContext} from "../_app";
import {useRouter} from "next/router";

export default function Community({creators}) {
    const scrollY = useContext(ScrollContext)
    const router = useRouter()
    useEffect(() => {
        window.scrollTo(0, scrollY)
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
    )
}

export async function getServerSideProps(context) {
    const creators = await fetch(`http://localhost:3000/api/creator/`).then(r => r.json())
    return {
        props: {creators: creators}, // will be passed to the page component as props
    }
}