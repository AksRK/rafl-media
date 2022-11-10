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
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {AuthProvider} from "../components/AuthProvider";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {renderProvider} = AuthProvider()
  useEffect(() => {
    console.log(router)
    // Обработка начала загрузки
    router.events.on("routeChangeStart", () => {
      setLoading(true);
    });
    // Обработка окончания загрузки
    router.events.on("routeChangeComplete", () => {
      setLoading(false);
    });
  }, [])

  return (
      <>
        {loading && <PreLoader />}
        {
          renderProvider(<Component {...pageProps} />)
        }
        {/*<AuthProvider>*/}
        {/*  <Component {...pageProps} />*/}
        {/*</AuthProvider>*/}
      </>
  )
}

export default MyApp
