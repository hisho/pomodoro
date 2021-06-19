import '@hisho/reset.css';
import '../styles/global.css';
import '../styles/tailwind.css';
import { VFC } from 'react';
import { AppProps } from 'next/app';
import 'what-input';

const MyApp: VFC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
