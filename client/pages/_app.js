// import "suneditor/dist/css/suneditor.min.css";
import 'antd/dist/antd.css';
import '../core/styles/suneditor.min.css'
import '../core/styles/globals.scss'
import '../core/styles/sun-editor.scss'
import 'react-toastify/dist/ReactToastify.css';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import '../core/styles/swiper-custom.scss'
import {createContext, useEffect, useState} from "react";
import {DefaultSeo} from "next-seo";
import {useRouter} from "next/router";
import axios from "axios";
import DefaultLayout from "../layouts/DefaultLayout";
import MyMain from "../components/MyMain";
import HomeLayout from "../layouts/HomeLayout";
import {ToastContainer} from "react-toastify";
import {YMInitializer} from "react-yandex-metrika";

export const AuthContext = createContext();
export const SliderContext = createContext();

function MyApp({Component, pageProps}) {
    const [isAuth, setIsAuth] = useState(false)
    const [banners, setBanners] = useState([])


    const router = useRouter();
    useEffect(() => {

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
                title='RAFL'
                description='Независимое издание, освещающее эстетическую сторону российского футбола'
                openGraph={{
                    title: 'RAFL',
                    description: 'Независимое издание, освещающее эстетическую сторону российского футбола'
                }}
            />
                <SliderContext.Provider value={banners}>
                    <AuthContext.Provider value={{isAuth, setIsAuth}}>
                        {
                            (
                                router.asPath.includes('admin')
                            )
                            ? <Component {...pageProps} />
                            : <DefaultLayout>
                                <MyMain>
                                    {
                                        (
                                            router.asPath.includes('contacts')
                                            || router.asPath.includes('user-license-agreement')
                                            || router.asPath.includes('about-project')
                                            || router.asPath.includes('posts')
                                            || router.asPath.includes('admin')
                                        )
                                            ? <Component {...pageProps} />
                                            : <HomeLayout>
                                                <Component {...pageProps} />
                                            </HomeLayout>
                                    }
                                </MyMain>
                                </DefaultLayout>
                        }
                    </AuthContext.Provider>
                </SliderContext.Provider>
            <ToastContainer/>
            <YMInitializer accounts={[91884114]} options={{
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: true,
                ecommerce: "dataLayer"
            }}/>
        </>
  )
}

export default MyApp
