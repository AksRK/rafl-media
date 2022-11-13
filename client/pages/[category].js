import Head from 'next/head'
import DefaultLayout from "../layouts/DefaultLayout";
import MyMain from "../components/MyMain";
import HomeLayout from "../layouts/HomeLayout";
import CardList from "../components/CardsList";
import {NextSeo} from "next-seo";
import {Category} from "../core/mock";

export default function Home({posts, category}) {
    return (
        <div>
            <NextSeo
                title={`Rafl - ${Category.find((c) => c.value === category).label}`}
                openGraph={{
                    title: `Rafl - ${Category.find((c) => c.value === category).label}`,
                }}
            />
            <DefaultLayout>
                <MyMain>
                    <HomeLayout>
                        <CardList posts={posts.docs}/>
                    </HomeLayout>
                </MyMain>
            </DefaultLayout>
        </div>
    )
}

export async function getServerSideProps(context) {
    const posts = await fetch(`http://localhost:3000/api/posts/category/${context.params.category}`).then(r => r.json())
    return {
        props: {posts, category: context.params.category}, // will be passed to the page component as props
    }
}