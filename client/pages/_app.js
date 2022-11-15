// import "suneditor/dist/css/suneditor.min.css";
import 'antd/dist/antd.css';
import '../core/styles/suneditor.min.css'
import '../core/styles/globals.scss'
import '../core/styles/sun-editor.scss'

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import '../core/styles/swiper-custom.scss'
import PreLoader from "../components/UI/PreLoader";
import {createContext, useEffect, useMemo, useState} from "react";
import {DefaultSeo} from "next-seo";
import {useRouter} from "next/router";
import axios from "axios";
import HomeLayout from "../layouts/HomeLayout";
import MyMain from "../components/MyMain";
import DefaultLayout from "../layouts/DefaultLayout";

export const AuthContext = createContext();
export const SliderContext = createContext();
export const ScrollContext = createContext();

function MyApp({Component, pageProps}) {
    const [isAuth, setIsAuth] = useState(false)
    const [banners, setBanners] = useState([])
    const [scroll, setScroll] = useState(0)
    const handleScroll = (value) => {
        setScroll(value)
    }
    const router = useRouter();
    useEffect(() => {
        document.addEventListener('scroll',() => handleScroll(window.scrollY))

        if (router.pathname.includes('/admin/panel')) {
            axios.get(`/api/auth/me`, {
                headers: {Authorization: localStorage.getItem('token')}
            })
                .then((r) => {
                    setIsAuth(true)
                })
                .catch(function (error) {
                    router.push('/admin/auth')
                });
        }
        axios.get('/api/posts/banner')
            .then((r) => {
                setBanners(r.data.docs)
            })
    }, [])

    return (
        <>
            <DefaultSeo
                title='Rafl'
                description='Независимое издание, освещающее эстетическую сторону российского футбола'
                openGraph={{
                    title: 'Rafl',
                    description: 'Независимое издание, освещающее эстетическую сторону российского футбола'
                }}
            />
            <ScrollContext.Provider value={scroll}>
                <SliderContext.Provider value={banners}>
                    <AuthContext.Provider value={{isAuth, setIsAuth}}>
                        <DefaultLayout>
                            <MyMain>
                                {
                                    (
                                        router.asPath.includes('contacts')
                                        ||  router.asPath.includes('user-license-agreement')
                                        ||  router.asPath.includes('about-project')
                                        ||  router.asPath.includes('posts')
                                    )
                                        ? <Component {...pageProps} />
                                        : <HomeLayout>
                                            <Component {...pageProps} />
                                        </HomeLayout>
                                }
                            </MyMain>
                        </DefaultLayout>
                    </AuthContext.Provider>
                </SliderContext.Provider>
            </ScrollContext.Provider>
        </>
  )
}

export default MyApp
