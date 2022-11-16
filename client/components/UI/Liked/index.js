import styles from './index.module.scss'
import {useEffect, useState} from "react";
import axios from "axios";

function Liked({likes, postId, typePost = 'default'}) {
    const [likesTotal, setLikesTotal] = useState(likes)
    const [likeCount, setLikeCount] = useState(0)
    const [btnDisable, setBtnDisable] = useState(false)
    const [clicked, setClicked] = useState(false)
    const [plusView, setPlusView] = useState(false)

    useEffect(() => {
        setLikesTotal(likes)
        setClicked(false)
        setLikeCount(0)
        setBtnDisable(false)
    }, [likes])

    const like = () => {
        if (likeCount <= 4) {
            setClicked(true)
            setLikeCount(likeCount + 1)
            setLikesTotal(likesTotal + 1)
            console.log(likesTotal)
            axios.put(`/api${typePost === 'creator'?'/creator':''}/posts/like/${postId}`,
            ).catch((error) => {
                console.log(error)
            })
        }
    }

    useEffect(() => {
        if (likeCount === 5) {
            setTimeout(() => {
                setBtnDisable(true)
            }, 700)

        }
    }, [likeCount])

    useEffect(() => {
        setPlusView(true)
        setClicked(false)
        const timer = setTimeout(() => {
            setPlusView(false)
        }, 700)
        return ()=> clearTimeout(timer);
    }, [clicked])

    return (
        <button disabled={btnDisable} onClick={like} className={styles.like}>
            <span></span> <span className={styles.like__count}>{plusView?'+'+likeCount:likesTotal}</span>
            {
                btnDisable?<div className={styles.like__boxThx}>
                    <div className={styles.like__thxText}>
                        Спасибо!
                    </div>
                </div>:''
            }
        </button>
    )
}

export default Liked;