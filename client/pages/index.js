import CardList from "../components/CardsList";
import {NextSeo} from "next-seo";
import {useContext, useEffect} from "react";
import {ScrollContext} from "./_app";
import {useRouter} from "next/router";

export default function Home({posts}) {
    const scrollY = useContext(ScrollContext)
    const router = useRouter()
    useEffect(() => {
        window.scrollTo(0, scrollY)
    }, [router.asPath])
    return (
        <>
            <NextSeo
                title={`Rafl - Медиа`}
                openGraph={{
                    title: `Rafl - Медиа`,
                }}
            />
            <CardList posts={posts}/>
        </>
    )
}

export async function getServerSideProps(context) {
    const posts = await fetch(`http://localhost:3000/api/posts/`).then(r => r.json())
    return {
        props: {posts: posts.docs}, // will be passed to the page component as props
    }
}