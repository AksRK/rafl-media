import CardList from "../components/CardsList";
import {NextSeo} from "next-seo";
import {Category} from "../core/mock";
import {useContext, useEffect} from "react";
import {ScrollContext} from "./_app";
import {useRouter} from "next/router";

export default function Home({posts, category}) {
    const scrollY = useContext(ScrollContext)
    const router = useRouter()
    useEffect(() => {
        window.scrollTo(0, scrollY)
    }, [router.asPath])

    return (
        <>
            <NextSeo
                title={`Rafl - ${Category.find((c) => c.value === category).label}`}
                openGraph={{
                    title: `Rafl - ${Category.find((c) => c.value === category).label}`,
                }}
            />
            <CardList posts={posts.docs}/>
        </>
    )
}

export async function getServerSideProps(context) {
    const posts = await fetch(`http://localhost:3000/api/posts/category/${context.params.category}`).then(r => r.json())
    return {
        props: {posts, category: context.params.category}, // will be passed to the page component as props
    }
}