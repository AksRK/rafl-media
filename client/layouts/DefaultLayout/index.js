import {useRouter} from "next/router";
import {useScroll} from "../../core/hooks/useScroll";
import {useState} from "react";
import Header from "../../components/Header";
import CarouselBanner from "../../components/CarouselBanner";
import Footer from "../../components/Footer";
import useWindowSize from "../../core/hooks/useWindowSize";
import {useInView} from "react-intersection-observer";

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
    const { ref: refSpan, inView: inViewSpan } = useInView({
        threshold: 1,
        initialInView: true,
        rootMargin: '555px 1000px 500px 1000px'
    });

    const { ref, inView } = useInView({
        threshold: 1,
        rootMargin: '1055px 1000px 50px 1000px'
    });


    function setWidth() {
        if (size.width <= 1600) {
            return 96 + (scrollY / 200)
        }

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

    if (router.asPath.includes('contacts')) {
        return (<>
            <div className="container">
                <div>
                    <Header burgerState={burgerState} setBurgerState={setBurgerState} routes={publicRoutes}
                            setBurgerStateZIndex={setBurgerStateZIndex}/>
                </div>
            </div>
            <div>
                <div className={'container'}>{children}</div>
            </div>
            <div>
                <div className="container">
                    <Footer styled={{
                        position: 'static'
                    }}/>
                </div>
            </div>
        </>)
    }


    return (
        <>
            <div className="container">
                <div className={'head' + (noBanner(!inViewSpan, !inViewSpan) ? ' head_hidden' : '')}
                     style={{
                         zIndex: burgerStateZIndex
                     }}
                >
                    <Header burgerState={burgerState} setBurgerState={setBurgerState} routes={publicRoutes}
                            setBurgerStateZIndex={setBurgerStateZIndex}/>
                </div>
                {
                    noBanner(null,
                        <div className={'head' + (!inViewSpan || inView ? ' head_hidden' : '')} style={{
                            top: '142px'
                        }}>
                            <CarouselBanner/>
                        </div>
                    )

                }
            </div>
            <div className={'body' + (noBanner('', ' body_with_banner'))}>
                <span ref={refSpan} className="hidden_block"></span>
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
                <span ref={ref} className="hidden_block"></span>
            </div>
            <div className={(!inViewSpan || inView ? '' : 'head_hidden')}>
            {/*<div style={{opacity: !inViewSpan || inView ? 1 : 0}}>*/}
                <div className="container">
                    <Footer/>
                </div>
            </div>
        </>
    )
}
