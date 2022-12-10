import {useRouter} from "next/router";
import {useScroll} from "../../core/hooks/useScroll";
import {useState} from "react";
import Header from "../../components/Header";
import CarouselBanner from "../../components/CarouselBanner";
import Footer from "../../components/Footer";
import useWindowSize from "../../core/hooks/useWindowSize";
import {useInView} from "react-intersection-observer";

export const publicRoutes = [
    {link: '/', type:'internal', name: 'Медиа', scroll: false},
    {link: '/community', type:'internal', name: 'Комьюнити', scroll: false},
    {link: 'https://rafl.studio/', type:'external', name: 'Студия', scroll: true},
    {link: '/about-project', type:'internal', name: 'О проекте', scroll: true},
    {link: '/contacts', type:'internal', name: 'Контакты', scroll: true},
]

export default function DefaultLayout({children, bannerState = true}) {
    const router = useRouter()
    const [burgerState, setBurgerState] = useState(false)
    const [burgerStateZIndex, setBurgerStateZIndex] = useState(burgerState ? '4' : '2')
    const {scrollY} = useScroll()
    const size = useWindowSize()
    const { ref: refSpan, inView: inViewSpan } = useInView({
        threshold: 0.1,
        initialInView: true,
        rootMargin: '55px 1000px 500px 1000px'
    });
    const { ref, inView } = useInView({
        threshold: 0.1,
        rootMargin: '1055px 1000px 100px 1000px'
    });

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
                {
                    router.asPath.includes('posts')
                        ? <div className={'container'}>
                            <span ref={refSpan} className="hidden_block"></span>
                                {children}
                            <span ref={ref} className="hidden_block"></span>
                        </div>
                        : <div className="container">
                            <span ref={refSpan} className="hidden_block"></span>
                            {children}
                            <span ref={ref} className="hidden_block"></span>
                        </div>
                }
            </div>
            <div className={(!inViewSpan || inView ? 'index-6' : 'head_hidden')}>
            {/*<div style={{opacity: !inViewSpan || inView ? 1 : 0}}>*/}
                <div className="container">
                    <Footer styled={router.asPath.includes('posts/') ? {
                        maxWidth: '1200px',
                        margin: '0 0 60px 0'
                    } : {}}/>
                </div>
            </div>
        </>
    )
}
