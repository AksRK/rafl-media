import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CarouselBanner from "../../components/CarouselBanner";

export const publicRoutes = [
    {link: '/posts', name: 'Тело Поста Тест'},
    {link: '/', name: 'Медиа'},
    {link: '/community', name: 'Комьюнити'},
    {link: '/about-project', name: 'О проекте'},
    {link: '/contacts', name: 'Контакты'},
]

export default function DefaultLayout({children, bannerState=true}) {
    return (
        <div className={'container'}>
            <Header routes={publicRoutes}/>
            {
                bannerState?<CarouselBanner/>:''
            }
            {children}
            <Footer/>
        </div>
    )
}