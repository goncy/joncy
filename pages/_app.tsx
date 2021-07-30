import * as React from "react";
import Head from "next/head";
import {
  ChakraProvider,
  Heading,
  Text,
  Container,
  Stack,
  Divider,
  Link,
  StackDivider,
  useColorMode,
  Box,
} from "@chakra-ui/react";
import {AppProps} from "next/app";
import Script from "next/script";
import {MoonIcon, SunIcon} from "@chakra-ui/icons";

import theme from "../theme";
import * as analytics from "../analytics";
import TwitterIcon from "../ui/icons/Twitter";
import FixedImage from "../ui/display/FixedImage";
import TwitchIcon from "../ui/icons/Twitch";
import YoutubeIcon from "../ui/icons/Youtube";

const App: React.FC<AppProps> = ({Component, pageProps}) => {
  const {toggleColorMode, colorMode} = useColorMode();

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
      <Container
        borderRadius="sm"
        borderWidth={1}
        boxShadow="sm"
        layerStyle="container"
        maxWidth="container.xl"
        padding={0}
      >
        <Stack divider={<StackDivider />} spacing={0}>
          <Stack alignItems="center" layerStyle="card" padding={4} spacing={2} textAlign="center">
            <Stack
              alignItems="baseline"
              aria-label="Cambiar modo de color"
              cursor="pointer"
              direction="row"
              fontSize={{base: 20, md: 24}}
              role="button"
              spacing={2}
              onClick={toggleColorMode}
            >
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              <Heading>Joncy</Heading>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Stack>
            <Text textStyle="soft">
              Trabajos en IT que ayudan a seguir generando contenido para la comunidad 🙌
            </Text>
          </Stack>
          <Component {...pageProps} />
        </Stack>
        <Divider />
        {/* Start Footer */}
        <Stack divider={<StackDivider />} spacing={0}>
          <Stack direction={{base: "column-reverse", md: "row"}} padding={4} spacing={4}>
            <Box
              minHeight={{base: 512, md: 128}}
              minWidth={{base: "100%", md: 36}}
              position="relative"
            >
              <FixedImage
                alt="Gonzalo Pozzo parado con un micrófono"
                borderRadius="sm"
                layout="fill"
                objectFit="cover"
                src="/assets/avatar.jpg"
              />
            </Box>
            <Stack spacing={2}>
              <Heading fontWeight="normal">
                ¡Hola! Soy <b>Goncy</b>.
              </Heading>
              <Stack spacing={4}>
                <Text>
                  Soy frontend developer, actualmente trabajando en <b>Vercel</b>, también me gusta
                  generar contenido en <b>twitter</b>, <b>youtube</b> y <b>twitch</b>. Llegué a esta
                  idea, donde empresas con oportunidades abiertas y relevantes puedan publicarlas a
                  un costo razonable para conseguir llegada en la comunidad. El dinero generado por
                  estos anuncios colabora a que <b>todo</b> mi contenido siga siendo gratuito,
                  mientras acercamos más propuestas para conseguir un primer o mejor trabajo 🙌
                </Text>
                <Stack direction="row" justifyContent={{base: "center", md: "flex-start"}}>
                  <Link
                    isExternal
                    alignItems="center"
                    backgroundColor="primary.500"
                    borderRadius={9999}
                    color="white"
                    display="flex"
                    height={8}
                    href="https://twitter.gonzalopozzo.com"
                    justifyContent="center"
                    padding={1.5}
                    rel="noopener"
                    title="twitter"
                    width={8}
                  >
                    <TwitterIcon />
                  </Link>
                  <Link
                    isExternal
                    alignItems="center"
                    backgroundColor="primary.500"
                    borderRadius={9999}
                    color="white"
                    display="flex"
                    height={8}
                    href="https://twitch.gonzalopozzo.com"
                    justifyContent="center"
                    padding={1.5}
                    rel="noopener"
                    title="twitch"
                    width={8}
                  >
                    <TwitchIcon />
                  </Link>
                  <Link
                    isExternal
                    alignItems="center"
                    backgroundColor="primary.500"
                    borderRadius={9999}
                    color="white"
                    display="flex"
                    height={8}
                    href="https://youtube.gonzalopozzo.com"
                    justifyContent="center"
                    padding={1.5}
                    rel="noopener"
                    title="youtube"
                    width={8}
                  >
                    <YoutubeIcon />
                  </Link>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Text padding={4} textAlign="center" textStyle="soft">
            ¿Querés que la propuesta de tu empresa aparezca en <b>Joncy</b>? Escribime a{" "}
            <Link
              isExternal
              href="mailto:jobs@gonzalopozzo.com?subject=Quiero%20agregar%20mi%20propuesta%20a%20Joncy"
              textStyle="link"
            >
              joncy@gonzalopozzo.com
            </Link>
          </Text>
        </Stack>
        {/* End Footer */}
      </Container>
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
