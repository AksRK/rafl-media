import styles from './index.module.scss'
import useWindowSize from "../../core/hooks/useWindowSize";
import Link from 'next/link'
import Image from 'next/image'
import {Category} from "../../core/mock";
import ShrinkText from "../UI/ShrinkText/ShrinkText";
import {useRouter} from "next/router";

function Card({type, title, description, imgUrl, tag = null, path}) {
    const size = useWindowSize();
    const router = useRouter();
    const mobile = 479
    const arrow = <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 10V1H3" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1 12L12 1" stroke="black" strokeLinecap="round" strokeLinejoin="bevel"/>
    </svg>

    return (
        <Link href={path}
              scroll={false}
              className={styles.card + ' ' + (type === 'creator' ? styles.card_creator : '') + ' ' +
                  (mobile >= size.width ? styles.card_mob : '')
              }>
            <div className={styles.card__img + ' ' + (type === 'creator' ? styles.card__img_creator : '')}>
                <Image src={imgUrl} alt={title} width={378} height={512}/>
                {
                    type !== 'creator' && tag ?
                        <div className={styles.card__tag}>{Category.find((c) => c.value === tag).label}</div> :
                        ''
                }
                {
                    type !== 'creator' && tag
                        ? <div onClick={(event) => {
                            event.preventDefault()
                            router.push(`/${tag}`, null, {scroll: false})
                        }
                        } className={styles.card__tag}>
                            {Category.find((c) => c.value === tag).label}
                        </div> :

                        ''
                }

            </div>
            <div className={styles.card__wrp + ' ' + (type === 'creator' ? styles.card__wrp_creator : '')}>
                <h2 className={styles.card__title + ' ' + (type === 'creator' ? styles.card__title_creator : '')}>
                    <ShrinkText text={title.replace(':', ':\n')} maxChar={39}/>
                </h2>

                <span
                    className={styles.card__description + ' ' + (type === 'creator' ? styles.card__description_creator : '')}>
                     <ShrinkText text={description.replace(':', ':\n')} maxChar={mobile >= size.width ? 185 : 122}/>
                </span>

                <div className={styles.card__readBtn}>
                    {
                        type === 'creator' && mobile <= size.width ?
                            <>Смотреть статьи {arrow}</> : ''
                    }
                    {
                        type !== 'creator' ?
                            <>Читать {arrow}</> : ''
                    }
                </div>

            </div>
        </Link>
    )
}

export default Card;