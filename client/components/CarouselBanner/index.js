import styles from './index.module.scss'
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import useWindowSize from "../../core/hooks/useWindowSize";
import {useEffect, useState} from "react";

import tstImg from '../../public/tstImg.jpg'
import ShrinkText from "../UI/ShrinkText/ShrinkText";

export  default function CarouselBanner() {
    const size = useWindowSize()
    const [perView, setPerView] = useState(2.5)

    useEffect(() => {
        if (size.width <= 1600) setPerView(2.5);
        if (size.width <= 1450) setPerView(2.2);
        if (size.width <= 1024) setPerView(1.6);
        if (size.width <= 768) setPerView(1.2);
        if (size.width <= 479) setPerView(1.1);
    }, [size.width])


    return (
        <div className={styles.carousel}>
            <Swiper
                slidesPerView={perView}
                spaceBetween={16}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                navigation={size.width <= 479?false:true}
                modules={[Navigation, Autoplay]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <Link className={styles.card} href={'/asd'}>
                        <Image src={tstImg} alt={123}/>
                        <div className={styles.card__textWrp}>
                            <h3 className={styles.card__title}>Владимир Раевский: любить урал</h3>
                            <span>
                                «Футбол — уникальный вид человеческой деятельности» журналист Владимир Раевский о любви к «Уралу».
                            </span>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link className={styles.card} href={'/asd'}>
                        <Image src={tstImg} alt={123}/>
                        <div className={styles.card__textWrp}>
                            <h3 className={styles.card__title}>Ирина Подшибякина: на равных</h3>
                            <span>
                                <ShrinkText text={'Защитница «Локомотива» и Сборной России Ирина Подшибякина о своем пути, восприятии женского футбола'} maxChar={95}/>
                            </span>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <div style={{backgroundColor:'blue'}} className={styles.card}><h1>3</h1></div>
                </SwiperSlide>
                <SwiperSlide>
                    <div style={{backgroundColor:'orange'}} className={styles.card}><h1>4</h1></div>
                </SwiperSlide>
                <SwiperSlide>
                    <div style={{backgroundColor:'violet'}} className={styles.card}><h1>5</h1></div>
                </SwiperSlide>
            </Swiper>
        </div>

    )
}
