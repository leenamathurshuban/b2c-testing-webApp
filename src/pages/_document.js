import * as React from "react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta name='theme-color' content='#f1f1f1' />
        <meta name='msapplication-TileColor' content='#070707' />
        <meta name='msapplication-tap-highlight' content='no' />
        <meta name='theme-color' content='#f1f1f1' />
        <script src="https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js" type="text/javascript" />

        <link
          href='https://fonts.googleapis.com/css2?family=Inter:wght@300&family=Poppins:wght@400;700&display=swap'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap'
          rel='stylesheet'
        ></link>
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
