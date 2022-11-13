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
import {createContext, useEffect, useState} from "react";
import Head from 'next/head'
import {DefaultSeo} from "next-seo";
import {useRouter} from "next/router";
import axios from "axios";

export const AuthContext = createContext();

function MyApp({Component, pageProps}) {
  const [loading, setLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false)
  const router = useRouter();
  useEffect(() => {
    // Обработка начала загрузки
    router.events.on("routeChangeStart", () => {
      setLoading(true);
    });
    // Обработка окончания загрузки
    router.events.on("routeChangeComplete", () => {
      setLoading(false);
    });
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
          <Head>
              <meta charSet="UTF-8"/>
              <meta name="theme-color" content="#000"/>
          </Head>
        {loading && <PreLoader/>}
        <AuthContext.Provider value={{isAuth, setIsAuth}}>
          <Component {...pageProps} />
        </AuthContext.Provider>
      </>
  )
}

export default MyApp
