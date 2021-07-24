import * as React from "react";
import {ColorModeScript} from "@chakra-ui/react";
import NextDocument, {Html, Head, Main, NextScript} from "next/document";

import theme from "../theme";

export default class Document extends NextDocument {
  render(): JSX.Element {
    return (
      <Html lang="es">
        <Head />
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
