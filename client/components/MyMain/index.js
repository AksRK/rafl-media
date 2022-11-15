import styles from './index.module.scss'
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

export default function MyMain({children, bigPaddingInit = false, postInit = false}) {
    const {asPath} = useRouter()
    const [bigPadding, setBigPadding] = useState(bigPaddingInit)
    const [post, setPost] = useState(postInit)
    useEffect(() => {
        if (
            asPath.includes('contacts')
            ||  asPath.includes('user-license-agreement')
            ||  asPath.includes('about-project')
        ) {
            setBigPadding(true)
        }

        if (
            asPath.includes('posts')
        ) {
            setPost(true)
        }
    }, [])

    return (
        <main className={styles.main + ' ' +
            (bigPadding?styles.main_big_padding:'') +
            (post?styles.main_postBody:'')}>
            {children}
        </main>
    )
}