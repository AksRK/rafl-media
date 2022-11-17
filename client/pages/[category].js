import CardList from "../components/CardsList";
import {NextSeo} from "next-seo";
import {Category} from "../core/mock";
import {useEffect, useState} from "react";
import axios from "axios";

export default function Home({posts, category, next}) {

    const [nextPage, setNextPage] = useState(next)
    const [postList, setPostList] = useState(posts)

    function loadMorePosts() {
        axios.get(`/api/posts?page=${nextPage}`,
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
                title={`Rafl - ${Category.find((c) => c.value === category)?.label}`}
                openGraph={{
                    title: `Rafl - ${Category.find((c) => c.value === category)?.label}`,
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
    const posts = await fetch(`http://localhost:3000/api/posts/category/${context.params.category}`).then(r => r.json())

    if (!Category.find((c) => c.value === context.params.category)) {
        return {
            notFound: true,
        }
    }

    return {
        props: {posts: posts.docs, next: posts.nextPage, category: context.params.category}, // will be passed to the page component as props
    }
}