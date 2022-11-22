import styles from './index.module.scss'
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import useWindowSize from "../../core/hooks/useWindowSize";

export default function MyMain({children, bigPaddingInit = false, postInit = false}) {
    const size = useWindowSize()
    const router = useRouter()
    const [bigPadding, setBigPadding] = useState(bigPaddingInit)
    const [post, setPost] = useState(postInit)
    useEffect(() => {
        if (
            router.asPath.includes('contacts')
            ||  router.asPath.includes('user-license-agreement')
            ||  router.asPath.includes('about-project')
        ) {
            setBigPadding(true)
        } else {
            setBigPadding(false)
        }

        if (
            router.asPath.includes('posts')
        ) {
            setPost(true)
        } else {
            setPost(false)
        }
    }, [router.asPath])

    return (
        <main id={"main"}
              style={router.asPath.includes('contacts') ? {
                  minHeight: 'auto',
                  marginTop: size.width >= 479?'49px':''
              } : {}}
              className={styles.main + ' ' +
            (bigPadding ? styles.main_big_padding : ' ') + ' ' +
            (post ? styles.main_postBody : ' ')}>
            <div className="container myMobileContainer">
                {children}
            </div>
        </main>
    )
}