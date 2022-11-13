import styles from './index.module.scss'
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import useWindowSize from "../../core/hooks/useWindowSize";
import {useEffect, useState} from "react";

import tstImg from '../../public/tstImg.jpg'
import ShrinkText from "../UI/ShrinkText/ShrinkText";
import axios from "axios";
import CyrillicToTranslit from "cyrillic-to-translit-js";

export  default function CarouselBanner() {
    const size = useWindowSize()
    const [perView, setPerView] = useState(2.5)
    const [banners, setBanners] = useState([])

    useEffect(() => {
        axios.get('/api/posts/banner')
            .then((r) => {
                setBanners(r.data.docs)
            })
    }, [])

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
                {
                    banners.map(b => <SwiperSlide key={b._id}>
                        <Link className={styles.card} href={`/posts/${CyrillicToTranslit().transform(b.title, "-").replaceAll('?', '').replaceAll('&', '').toLowerCase()}`}>
                            <Image src={b.imageUrl.fullUrl} alt={b.title} width={533} height={500}/>
                            <div className={styles.card__textWrp}>
                                <h3 className={styles.card__title}>{b.title}</h3>
                                <span>
                                <ShrinkText text={b.description} maxChar={95}/>
                            </span>
                            </div>
                        </Link>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>

    )
}
