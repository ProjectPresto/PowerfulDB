import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { ReactElement, ReactNode, useEffect, useState } from 'react';

import { Slide, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { ContributorProvider } from '@context/contributorProvider';
import { ShowLoginProvider } from '@context/showLoginProvider';
import { Router } from 'next/router';
import Loader from '@components/Loader';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		Router.events.on('routeChangeStart', () => {
			setIsLoading(true);
		});

		Router.events.on('routeChangeComplete', () => {
			setIsLoading(false);
		});

		Router.events.on('routeChangeError', () => {
			setIsLoading(false);
		});
	}, []);

	const getLayout = Component.getLayout ?? (
		(page) => page
	);

	return (
		<>
			<Loader isLoading={isLoading}/>
			<ContributorProvider>
				<ShowLoginProvider>
					{getLayout(<Component {...pageProps} />)}
				</ShowLoginProvider>
			</ContributorProvider>
			<ToastContainer className="toastify" theme="dark" autoClose={5000} pauseOnFocusLoss={false} transition={Slide}/>
		</>
	);
};

export default MyApp;
