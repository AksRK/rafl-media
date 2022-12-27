import styles from './index.module.scss'
import Image from "next/image";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation} from "swiper";
import useWindowSize from "../../core/hooks/useWindowSize";
import {useContext, useEffect, useState} from "react";
import ShrinkText from "../UI/ShrinkText/ShrinkText";
import CyrillicToTranslit from "cyrillic-to-translit-js";
import {SliderContext} from "../../pages/_app";
import {useRouter} from "next/router";

export default function CarouselBanner() {
    const size = useWindowSize()
    const router = useRouter()
    const [perView, setPerView] = useState(2.5)
    const banners = useContext(SliderContext)

    useEffect(() => {
        if (size.width <= 1600) setPerView(2.5);
        if (size.width <= 1450) setPerView(2.2);
        if (size.width <= 1024) setPerView(1.6);
        if (size.width <= 768) setPerView(1.2);
        if (size.width <= 479) setPerView(1.1);
    }, [size.width])

    if (banners.length >= 1) {
        return (
            <div className={styles.carousel+ ' container'}>
                <Swiper
                    slidesPerView={perView}
                    spaceBetween={16}
                    loop={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}
                    navigation={!!size.width ? size.width <= 768 ? false : true : false}
                    modules={[Navigation, Autoplay]}
                    className="mySwiper mySwiper_border_radius"
                >
                    {
                        banners.map(b => <SwiperSlide key={b._id}>
                            <div className={styles.card}
                                 onClick={()=> {
                                     b.creator
                                         ?router.push(`/posts/${b.creator}/${CyrillicToTranslit().transform(b.title, "-").replaceAll('?', '').replaceAll('&', '').toLowerCase()}`)
                                         :router.push(`/posts/${CyrillicToTranslit().transform(b.title, "-").replaceAll('?', '').replaceAll('&', '').toLowerCase()}`)
                                 }}
                            >
                                <Image src={b.imageUrl.fullUrl} alt={b.title} width={533} height={500} priority={true}/>
                                <div className={styles.card__textWrp}>
                                    <h3 className={styles.card__title}>{b.title}</h3>
                                    <span style={{
                                        position: "relative",
                                        zIndex: '1000'
                                    }}>
                                    <ShrinkText text={b.description} maxChar={95}/>
                                </span>
                                </div>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        )
    }
}
