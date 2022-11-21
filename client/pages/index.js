import CardList from "../components/CardsList";
import {NextSeo} from "next-seo";
import {useEffect, useState} from "react";
import axios from "axios";

export default function Home({posts, next}) {
    const [nextPage, setNextPage] = useState(next)
    const [postList, setPostList] = useState(posts)

    function loadMorePosts() {
        axios.get(`/api/posts?page=${nextPage}`,
        ).then(result => {
            setPostList([...postList, ...result.data.docs])
            setNextPage(result.data.nextPage)
        }).catch((error) => {

        })
    }

    useEffect(() => {
        setPostList(posts)
    }, [posts])

    return (
        <>
            <NextSeo
                title={`Rafl - Медиа`}
                openGraph={{
                    title: `Rafl - Медиа`,
                }}
            />
            <CardList posts={postList}/>
            {
                nextPage? <button className={'btn'} style={{margin:'50px auto 0 auto'}} onClick={loadMorePosts}>Загрузить еще</button>:''
            }

        </>
    )
}

export async function getServerSideProps(context) {
    const posts = await fetch(`http://localhost:3000/api/posts/`).then(r => r.json())
    return {
        props: {posts: posts.docs, next: posts.nextPage, }, // will be passed to the page component as props
    }
}