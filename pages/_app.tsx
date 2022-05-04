import type {AppProps} from "next/app";

import * as React from "react";
import Head from "next/head";
import {ChakraProvider} from "@chakra-ui/react";
import Script from "next/script";

import theme from "../theme";
import * as analytics from "../analytics";
import Layout from "../app/components/Layout";

const App: React.FC<AppProps> = ({Component, pageProps}) => {
  return (
    <>
      <Head>
        <title>Joncy - Trabajos IT</title>
        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
        {/* Start meta tags */}
        <meta content="goncy" name="author" />
        <meta content="Gonzalo Pozzo" name="copyright" />
        <meta
          content="Joncy es un portal de empleos relevantes para la comunidad, con beneficios para empresas con búsquedas para primer trabajo o minorías"
          name="description"
        />
        <meta content="purple" name="theme-color" />
        <meta content="trabajo,frontend,backend,trainee,junior,semisenior,senior" name="keywords" />
        {/* End meta tags */}
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {/* Analytics configuration */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTM}`}
        strategy="lazyOnload"
        onLoad={analytics.initialize}
      />
    </>
  );
};

function AppContainer(props: AppProps): JSX.Element {
  return (
    <ChakraProvider theme={theme}>
      <App {...props} />
    </ChakraProvider>
  );
}

export default AppContainer;
