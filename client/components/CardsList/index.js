import styles from './index.module.scss'
import Card from "../Card";
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Skeleton from "../UI/Skeleton";

export default function CardsList({typeCard, creatorLogin, posts}) {
    const [loading, setLoading] = useState(true)
    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 500)
    }, [router.asPath])

    return (
        <div className={styles.cardsList}>
            <>
                {
                    loading
                        ? <>
                            <Skeleton />
                        </>
                        : <>
                            {
                                posts?.map((el, index) => {
                                    return (
                                        <Card key={el._id}
                                              type={typeCard}
                                              title={el.title}
                                              description={el.description}
                                              imgUrl={el.imageUrl.fullUrl}
                                              tag={el.category}
                                              path={!!creatorLogin ? `/posts/${creatorLogin}/${CyrillicToTranslit().transform(el.title, "-").replaceAll('?', '').replaceAll('&', '').toLowerCase()}` : `/posts/${CyrillicToTranslit().transform(el.title, "-").replaceAll('?', '').replaceAll('&', '').toLowerCase()}`}
                                        />
                                    )
                                })
                            }
                            <Skeleton />
                            </>
                }
            </>
        </div>
    )
}