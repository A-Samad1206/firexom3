import 'tailwindcss/tailwind.css';
import Head from 'next/head';

import Layout from '#components/Layout';
import CartContextProvider from '#Ctx';
function MyApp({ Component, pageProps }) {
  console.log('_App');
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <CartContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartContextProvider>
    </>
  );
}

export default MyApp;
