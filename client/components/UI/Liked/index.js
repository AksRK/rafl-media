import styles from './index.module.scss'
import {useEffect, useState} from "react";
import axios from "axios";

function Liked({likes, postId, typePost = 'default', likeFix = true}) {
    const [likesTotal, setLikesTotal] = useState(likes)
    const [likeCount, setLikeCount] = useState(0)
    const [btnDisable, setBtnDisable] = useState(false)
    const [firstView, setFirstView] = useState(true)
    const [clicked, setClicked] = useState(false)
    const [plusView, setPlusView] = useState(false)

    useEffect(() => {
        setLikesTotal(likes)
        setClicked(false)
        setLikeCount(0)
        setBtnDisable(false)
    }, [likes])

    const like = () => {
        setFirstView(false)
        if (likeCount <= 4) {
            setClicked(true)
            setLikeCount(likeCount + 1)
            setLikesTotal(likesTotal + 1)
            axios.put(`/api${typePost === 'creator'?'/creator':''}/posts/like/${postId}`,
            ).catch((error) => {

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
        <button disabled={btnDisable} onClick={like} className={likeFix ? styles.like : styles.like + ' ' + ""}>
            {/*<span></span> <span className={styles.like__count}>{(plusView && !firstView) ? '+' + likeCount : likesTotal}</span>*/}
            <span></span> <span className={styles.like__count} style={(plusView && !firstView)?{opacity:0}:{}}>{likesTotal}</span>
            {
                (plusView && !firstView)?<span className={styles.like_plus_count}>+ {likeCount}</span>:''
            }
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