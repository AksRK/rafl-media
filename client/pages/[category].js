import CardList from "../components/CardsList";
import {NextSeo} from "next-seo";
import {Category} from "../core/mock";
import {useEffect} from "react";

export default function Home({posts, category}) {
    return (
        <>
            <NextSeo
                title={`Rafl - ${Category.find((c) => c.value === category)?.label}`}
                openGraph={{
                    title: `Rafl - ${Category.find((c) => c.value === category)?.label}`,
                }}
            />
            <CardList posts={posts.docs}/>
        </>
    )
}

export async function getServerSideProps(context) {
    const posts = await fetch(`http://localhost:3000/api/posts/category/${context.params.category}`).then(r => r.json())

    if (!Category.find((c) => c.value === context.params.category)) {
        return {
            notFound: true,
        }
    }

    return {
        props: {posts, category: context.params.category}, // will be passed to the page component as props
    }
}