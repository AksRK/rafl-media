import DefaultLayout from "../layouts/DefaultLayout";
import MyMain from "../components/MyMain";
import HomeLayout from "../layouts/HomeLayout";
import CardList from "../components/CardsList";
import {Category} from "../core/mock";
import {NextSeo} from "next-seo";

export default function Home({posts}) {



    return (
        <>
            <NextSeo
                title={`Rafl - Медиа`}
                openGraph={{
                    title: `Rafl - Медиа`,
                }}
            />
            <DefaultLayout>
                <MyMain>
                    <HomeLayout>
                        <CardList posts={posts}/>
                    </HomeLayout>
                </MyMain>
            </DefaultLayout>
        </>
    )
}

export async function getServerSideProps(context) {
    const posts = await fetch(`http://localhost:3000/api/posts/`).then(r => r.json())
    return {
        props: {posts: posts.docs}, // will be passed to the page component as props
    }
}