import styles from './index.module.scss';
import useWindowSize from "../../../core/hooks/useWindowSize";
import {useEffect, useState} from "react";

function SkeletonComunity({type}) {
    const size = useWindowSize()
    const [list, setList] = useState([1, 2, 3, 4])

    useEffect(() => {
        if (size.width <= 1600) {
            const listNew = []
            for (let i = 0; i < 3; i++) {
                listNew.push(i)
            }
            setList(listNew)
        }
        ;
        if (size.width <= 1212) {
            const listNew = []
            for (let i = 0; i < 2; i++) {
                listNew.push(i)
            }
            setList(listNew)
        }
        ;
        if (size.width <= 811) {
            const listNew = []
            for (let i = 0; i < 1; i++) {
                listNew.push(i)
            }
            setList(listNew)
        }
        ;
    }, [size.width])

    return (
        <>
            {
                list.map(s => <div key={s} className={styles.skeleton}>
                    <div className={styles.skeleton__loading}></div>
                    <div className={styles.skeleton__img}></div>
                    <div className={styles.skeleton__wrp}>
                        <div className={styles.skeleton__title}></div>
                        <div className={styles.skeleton__description}></div>
                    </div>
                </div>)
            }
        </>
    )
}

export default SkeletonComunity;