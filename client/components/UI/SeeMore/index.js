import styles from './index.module.scss'
import {useState} from "react";
import Link from 'next/link'
import Marquee from "react-fast-marquee";

function SeeMore({category, authorName, linksArray}) {
    const arrow = <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1H9.39981C10.9998 1 12.3998 2.3 12.3998 4V14.8" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5.09961 7.5L8.29961 10.7L12.3996 14.8L19.6996 7.5" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
    const [seeMoreState,setSeeMoreState] = useState(false)

    return (
        <div className={styles.seeMoreWrp}>

            <div onClick={()=> setSeeMoreState(!seeMoreState)}
                 className={styles.seeMore+ ' ' + (seeMoreState?styles.seeMore_open:'')}>
                <div className={styles.seeMore__el}>
                    <div className={styles.seeMore__category}>
                        Интервью
                    </div>
                    <div style={seeMoreState?{transform:'rotate3d(1, 0, 0, 160deg)'}:{}}
                         className={styles.seeMore__arrowWrp}>
                        {arrow}
                    </div>

                    <div className={styles.seeMore__currentAuthor}
                        style={{
                            opacity: seeMoreState ? 0 : 1
                        }}
                    >
                        <Marquee gradient={false}>
                            <div style={{marginRight: '15px'}}>Ирина Подшибяина: на равных</div>
                        </Marquee>
                        {/*<span>*/}
                        {/*    Ирина Подшибяина: на равных*/}
                        {/*</span>*/}
                    </div>
                </div>
                <div className={styles.seeMore__el+ ' ' + styles.seeMore__el_contentRight}>
                    <div style={seeMoreState?{opacity:'100%'}:{}} className={styles.seeMore__linkWrp}>
                        <Link className={'link link_active'} href={''}>
                            {'Ирина Подшибяина: на равных'.replace(':',':\n')}
                        </Link>
                        <Link className={'link'} href={''}>
                            {'Владимир Раевский: любить урал'.replace(':',':\n')}
                        </Link>
                        <Link className={'link'} href={''}>
                            {'Дарья Исаева: в центре внимания'.replace(':',':\n')}
                        </Link>
                        <Link className={'link'} href={''}>
                            {' Юрий Шаров: от игры к игре'.replace(':',':\n')}
                        </Link>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default SeeMore;