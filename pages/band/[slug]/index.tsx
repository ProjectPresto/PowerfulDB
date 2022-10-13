import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { ReactElement } from 'react';

import { NextPageWithLayout } from '@pages/_app';
import Band from '@models/band';
import MainLayout from '@components/layouts/MainLayout';
import BandService from '@services/BandService';
import AuthorHero from '@components/authors/viewPage/AuthorHero';
import ArticleContainer from '@components/generic/ArticleContainer';
import AuthorAlbums from '@components/authors/viewPage/AuthorAlbums';


interface BandView {
	band: Band;
}

const BandView: NextPageWithLayout<BandView> = ({ band }) => {
	return (
		<>
			<Head>
				<title>{band.name} | PowerfulDB</title>
			</Head>
			<AuthorHero band={band}/>
			<div className="flex flex-col gap-12 md:gap-16 px-5 md:px-10 lg:px-14 py-8 mx-auto max-w-screen-lg w-full">
				<ArticleContainer article={band.article}/>
				<AuthorAlbums band={band}/>
			</div>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const slug = context.params?.slug;

	let band;
	try {
		band = await BandService.getBand(slug as string);
	} catch (ex) {
		return {
			notFound: true
		};
	}

	return {
		props: {
			band
		}
	};
};
export default BandView;

BandView.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
