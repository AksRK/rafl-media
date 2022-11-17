import {useRouter} from "next/router";
import {useScroll} from "../../core/hooks/useScroll";
import {useState} from "react";
import Header from "../../components/Header";
import CarouselBanner from "../../components/CarouselBanner";
import Footer from "../../components/Footer";
import useWindowSize from "../../core/hooks/useWindowSize";

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
    const {scrollY} = useScroll()
    const size = useWindowSize()


    function setWidth() {
        // if (96 + (scrollY / 100) > 100) {
        //     return 100
        // }

        if (size.width <= 1600) {
            return 96 + (scrollY / 200)
        }
        ;
        if (size.width <= 768) return 92 + (scrollY / 100);
    }

    function noBanner(ifAction, elseAction) {
        if ( router.asPath.includes('contacts')
            || router.asPath.includes('user-license-agreement')
            || router.asPath.includes('about-project')
            || router.asPath.includes('posts')) {
            return ifAction
        }else {
            return elseAction
        }
    }

    function otherPages(ifAction, elseAction) {
        if ( router.asPath.includes('contacts')
            || router.asPath.includes('user-license-agreement')
            || router.asPath.includes('about-project')) {
            return ifAction
        }else {
            return elseAction
        }
    }

    return (
        <>
            <div className="container">
                <div className={'head' + (scrollY >= noBanner(50, 650) ? ' head_hidden' : '')}
                     style={{
                         zIndex: burgerStateZIndex
                     }}
                >
                    <Header burgerState={burgerState} setBurgerState={setBurgerState} routes={publicRoutes}
                            setBurgerStateZIndex={setBurgerStateZIndex}/>
                </div>
                {
                    noBanner(null,
                        <div className={'head' + (scrollY >= 650 ? ' head_hidden' : '')} style={{
                            top: '142px'
                        }}>
                            <CarouselBanner/>
                        </div>
                    )

                }
            </div>
            <div className={'body' + (noBanner('', ' body_with_banner'))}>
                {
                    router.asPath.includes('posts')
                        ? <div className={'container'}>{children}</div>
                        : <div className="container" style={otherPages({}, {
                            width: `${setWidth()}%`,
                            maxWidth: '100vw'
                        })}>
                            {children}
                        </div>
                }

            </div>
            <div style={scrollY <= noBanner(50, 650) ? {opacity: 0} : {}}>
                <div className="container">
                    <Footer/>
                </div>
            </div>
        </>
    )
}
