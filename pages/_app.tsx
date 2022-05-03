import type { AppProps } from 'next/app';
import PageLayout from '../components/PageLayout';
import '../styles/globals.css';


function MyApp({ Component, pageProps }: AppProps) {
  return <PageLayout><Component {...pageProps} /></PageLayout>;
}

export default MyApp;
