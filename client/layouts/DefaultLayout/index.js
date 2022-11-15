import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CarouselBanner from "../../components/CarouselBanner";
import {useRouter} from "next/router";

export const publicRoutes = [
    {link: '/', name: 'Медиа'},
    {link: '/community', name: 'Комьюнити'},
    {link: '/about-project', name: 'О проекте'},
    {link: '/contacts', name: 'Контакты'},
]

export default function DefaultLayout({children, bannerState=true}) {
    const router = useRouter()

    return (
        <div className={'container'}>
            <Header routes={publicRoutes}/>
            {
                router.asPath.includes('contacts')
                ||  router.asPath.includes('user-license-agreement')
                ||  router.asPath.includes('about-project')
                ||  router.asPath.includes('posts')
                    ? null
                    : <CarouselBanner/>
            }
            {children}
            <Footer/>
        </div>
    )
}