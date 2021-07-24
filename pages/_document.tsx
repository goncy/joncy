import * as React from "react";
import NextDocument, {Html, Head, Main, NextScript} from "next/document";

export default class Document extends NextDocument {
  render(): JSX.Element {
    return (
      <Html lang="es">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
