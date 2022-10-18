import { GetServerSideProps } from 'next/types';
import Head from 'next/head';
import { ReactElement } from 'react';

import { NextPageWithLayout } from '@pages/_app';
import Artist from '@models/artist';
import AuthorHero from '@components/authors/viewPage/AuthorHero';
import MainLayout from '@components/layouts/MainLayout';
import ArtistService from '@services/ArtistService';
import ArticleContainer from '@components/generic/ArticleContainer';
import AuthorAlbums from '@components/authors/viewPage/AuthorAlbums';
import ArtistMembershipsList from '@components/authors/viewPage/ArtistMembershipsList';

interface ArtistView {
	artist: Artist;
}

const ArtistView: NextPageWithLayout<ArtistView> = ({ artist }) => {
	return (
		<>
			<Head>
				<title>{artist.name} | PowerfulDB</title>
			</Head>
			<AuthorHero artist={artist}/>
			<div className="flex flex-col gap-12 md:gap-16 px-5 md:px-10 lg:px-14 py-8 mx-auto max-w-screen-lg w-full">
				<ArticleContainer article={artist.article}/>
				<AuthorAlbums artist={artist}/>
				<ArtistMembershipsList artist={artist}/>
			</div>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const slug = context.params?.slug;

	let artist;
	try {
		artist = await ArtistService.getArtist(slug as string);
	} catch (ex) {
		return {
			notFound: true
		};
	}

	return {
		props: {
			artist
		}
	};
};

export default ArtistView;

ArtistView.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
