import {useRouter} from "next/router";
import {useScroll} from "../../core/hooks/useScroll";
import {useState} from "react";
import Header from "../../components/Header";
import CarouselBanner from "../../components/CarouselBanner";
import Footer from "../../components/Footer";

export const publicRoutes = [
    {link: '/', name: 'Медиа'},
    {link: '/community', name: 'Комьюнити'},
    {link: '/about-project', name: 'О проекте'},
    {link: '/contacts', name: 'Контакты'},
]

export default function DefaultLayout({children, bannerState = true}) {
    const router = useRouter()
    const [burgerState, setBurgerState] = useState(false)
    const [burgerStateZIndex, setBurgerStateZIndex] = useState(burgerState ? '4' : '2')
    const {scrollX, scrollY} = useScroll()

    function setWidth() {
        console.log(scrollY / 100)
        if (scrollY === 0) {
            return 96
        }
        return 96 + (scrollY / 200)
    }

    return (
        <>
            <div className="container">
                <div className={'head' + (scrollY >= 650 ? ' head_hidden' : '')}
                     style={{
                         zIndex: burgerStateZIndex
                     }}
                >
                    <Header burgerState={burgerState} setBurgerState={setBurgerState} routes={publicRoutes}
                            setBurgerStateZIndex={setBurgerStateZIndex}/>
                </div>
                {
                    router.asPath.includes('contacts')
                    || router.asPath.includes('user-license-agreement')
                    || router.asPath.includes('about-project')
                    || router.asPath.includes('posts')
                        ? null
                        : <div className={'head' + (scrollY >= 650 ? ' head_hidden' : '')} style={{
                            top: '142px'
                        }}>
                            <CarouselBanner/>
                        </div>
                }
            </div>
            <div className={'body' + (bannerState ? ' body_with_banner' : '')}>
                <div className="container" style={{
                    width: `${setWidth()}%`,
                    maxWidth: '100vw'
                }}>
                    {children}
                </div>
            </div>
            <div style={scrollY <= 650 && bannerState ? {opacity: 0} : {}}>
                <div className="container">
                    <Footer/>
                </div>
            </div>
        </>
    )
}