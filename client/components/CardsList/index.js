import styles from './index.module.scss'
import Card from "../Card";
import CyrillicToTranslit from 'cyrillic-to-translit-js';

export default function CardsList({typeCard, creatorLogin, posts}) {
    return (
        <div className={styles.cardsList}>
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
        </div>
    )
}