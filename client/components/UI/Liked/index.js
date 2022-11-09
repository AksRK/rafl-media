import styles from './index.module.scss'
import {useEffect, useState} from "react";

function Liked() {
    const [likeCount, setLikeCount] = useState(0)
    const [btnState, setBtnState] = useState(false)
    const [clicked, setClicked] = useState(false)
    const [startAnimThx, setStartAnimThx] = useState(false)

    const liked = () => {
        if (!clicked && likeCount <= 4) {
            setClicked(true)
            setLikeCount(likeCount + 1)
        }
    }

    useEffect(()=> {
        setTimeout(()=>{
            if (clicked){
                setClicked(false)
            }
        }, 1000)
    }, [clicked])

    useEffect(()=> {
        if (likeCount === 5) {
            setTimeout(()=> {
                setBtnState(true)
            }, 1000)
        }
    }, [likeCount])


    return (
        <button disabled={btnState} onClick={!clicked?liked:()=>{}} className={styles.like}>
            {
                clicked?
                    <> <span></span> <span className={styles.like__count}>{'+'+likeCount}</span></>:
                    <> <span></span> <span className={styles.like__total}>123</span></>
            }

            {
                btnState?<div className={styles.like__boxThx}>
                    <div className={styles.like__thxText}>
                        Спасибо!
                    </div>
                </div>:''
            }

        </button>
    )
}

export default Liked;