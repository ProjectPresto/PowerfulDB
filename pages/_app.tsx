import '../styles/globals.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Router } from 'next/router';
import { ReactElement, ReactNode, useEffect, useState } from 'react';

import { Provider } from 'react-redux';
import { Slide, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Loader from '@components/Loader';
import Store from '@store/store';
import { setContributor } from '@store/auth';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

const store = Store;

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		store.dispatch(setContributor());

		Router.events.on('routeChangeStart', () => setIsLoading(true));
		Router.events.on('routeChangeComplete', () => setIsLoading(false));
		Router.events.on('routeChangeError', () => setIsLoading(false));
	}, []);

	const getLayout = Component.getLayout ?? (
		(page) => page
	);

	return (
		<>
			<Loader isLoading={isLoading}/>
			<Provider store={store}>
				{getLayout(<Component {...pageProps} />)}
			</Provider>
			<ToastContainer className="toastify" theme="dark" autoClose={5000} pauseOnFocusLoss={false} transition={Slide}/>
		</>
	);
};

export default MyApp;
