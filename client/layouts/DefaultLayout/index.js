import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CarouselBanner from "../../components/CarouselBanner";
import {useRouter} from "next/router";
import {useScroll} from "../../core/hooks/useScroll";

export const publicRoutes = [
    {link: '/', name: 'Медиа'},
    {link: '/community', name: 'Комьюнити'},
    {link: '/about-project', name: 'О проекте'},
    {link: '/contacts', name: 'Контакты'},
]

export default function DefaultLayout({children, bannerState=true}) {
    const router = useRouter()
    const {scrollX, scrollY} = useScroll()
    return (
        <div className={'container'}>
            <div className={'head' + (scrollY >= 450?' head_hidden':'')}>
                <Header routes={publicRoutes}/>
                {
                    router.asPath.includes('contacts')
                    ||  router.asPath.includes('user-license-agreement')
                    ||  router.asPath.includes('about-project')
                    ||  router.asPath.includes('posts')
                        ? null
                        : <CarouselBanner/>
                }
            </div>

            <div className={'body'+ (bannerState?' body_with_banner':'')}>
                {children}
            </div>
            <div style={scrollY <= 450 && bannerState?{opacity:0}:{}}>
                <Footer/>
            </div>
        </div>
    )
}