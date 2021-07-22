import * as React from "react";
import Head from "next/head";
import {
  ChakraProvider,
  Heading,
  Text,
  Image,
  Container,
  Stack,
  Divider,
  Link,
  Flex,
  StackDivider,
} from "@chakra-ui/react";
import {AppProps} from "next/app";

import theme from "../theme";

const App: React.FC<AppProps> = ({Component, pageProps}) => {
  return (
    <>
      <Head>
        <title>Joncy - Trabajos IT</title>
        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
        {/* Start meta tags */}
        <meta content="goncy" name="author" />
        <meta content="Gonzalo Pozzo" name="copyright" />
        {/* End meta tags */}
      </Head>
      <ChakraProvider theme={theme}>
        <Container
          backgroundColor="white"
          borderRadius="sm"
          boxShadow="sm"
          maxWidth="container.xl"
          padding={0}
        >
          <Stack divider={<StackDivider />} spacing={0}>
            <Stack alignItems="center" padding={4} spacing={2} textAlign="center">
              <Heading>Joncy</Heading>
              <Text color="gray.500" fontWeight="500">
                Trabajos en IT que ayudan a seguir generando contenido para la comunidad 🙌
              </Text>
            </Stack>
            <Component {...pageProps} />
          </Stack>
          <Divider />
          {/* Start Footer */}
          <Stack direction={{base: "column-reverse", md: "row"}} padding={4} spacing={4}>
            <Image minWidth={{base: "100%", sm: 36}} objectFit="contain" src="/assets/avatar.jpg" />
            <Stack spacing={2}>
              <Heading fontWeight="normal">
                ¡Hola! Soy <b>Goncy</b>.
              </Heading>
              <Stack spacing={4}>
                <Text>
                  Soy frontend developer, actualmente trabajando en <b>Vercel</b>, también me gusta
                  generar contenido en <b>twitter</b>, <b>youtube</b> y <b>twitch</b>. Llegué a esta
                  idea, donde empresas con oportunidades abiertas y relevantes puedan publicarlas a
                  un costo razonable para conseguir llegada la comunidad. El dinero generado por
                  estos anuncios colabora a que <b>todo</b> mi contenido siga siendo gratuito
                  mientras acercamos más propuestas para conseguir un primer o mejor trabajo 🙌
                </Text>
                <Stack direction="row" justifyContent={{base: "center", md: "flex-start"}}>
                  <Link isExternal href="https://twitter.gonzalopozzo.com">
                    <Flex
                      alignItems="center"
                      backgroundColor="primary.500"
                      backgroundImage={`url(https://icongr.am/fontawesome/twitter.svg?size=20&color=ffffff)`}
                      backgroundPosition="7px 6px"
                      backgroundRepeat="no-repeat"
                      backgroundSize="20px"
                      borderRadius={9999}
                      color="white"
                      height={8}
                      justifyContent="center"
                      width={8}
                    />
                  </Link>
                  <Link isExternal href="https://twitch.gonzalopozzo.com">
                    <Flex
                      alignItems="center"
                      backgroundColor="primary.500"
                      backgroundImage={`url(https://icongr.am/fontawesome/twitch.svg?size=20&color=ffffff)`}
                      backgroundPosition="7px 7px"
                      backgroundRepeat="no-repeat"
                      backgroundSize="20px"
                      borderRadius={9999}
                      color="white"
                      height={8}
                      justifyContent="center"
                      width={8}
                    />
                  </Link>
                  <Link isExternal href="https://youtube.gonzalopozzo.com">
                    <Flex
                      alignItems="center"
                      backgroundColor="primary.500"
                      backgroundImage={`url(https://icongr.am/fontawesome/youtube-play.svg?size=20&color=ffffff)`}
                      backgroundPosition="7px 6px"
                      backgroundRepeat="no-repeat"
                      backgroundSize="20px"
                      borderRadius={9999}
                      color="white"
                      height={8}
                      justifyContent="center"
                      width={8}
                    />
                  </Link>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          {/* End Footer */}
        </Container>
      </ChakraProvider>
    </>
  );
};

export default App;
