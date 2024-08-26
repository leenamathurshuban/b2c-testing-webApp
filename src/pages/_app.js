import HeaderComp from "@/components/Header/Header";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/Header/header.scss";
import "../styles/global.scss";
import FooterComp from "@/components/Footer/footer";
import "../components/Privacy/privacy.scss";
import "../components/Mac-sale/mac-sale.scss";
import "../components/Mac-parts/mac-parts.scss";
import "../components/Testimonial/testimonial.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/style.scss";
import "../components/Loader/loader.scss";
import "../components/Mac-repair/styles.scss";
import "../components/Mac-repair/mac-repair.scss";
import "../components/Support/support.scss";

import "../components/sell-your-mac/sell-repair.scss";

import "../styles/responsive.scss";
import "../components/Footer/footer.scss";
import Tobbar from "@/components/Header/Topbar";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "../appRedux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Head from "next/head";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  let persistor = persistStore(store);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Head>
        <title>Apple fix pros</title>

        <meta name='description' content='Apple fix pros' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/icon.ico' />
      </Head>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </Provider>
    </>
  );
}
