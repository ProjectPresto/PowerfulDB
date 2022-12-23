import { GetServerSideProps } from 'next';
import { ReactElement, useEffect, useState } from 'react';

import { NextPageWithLayout } from '@pages/_app';
import AlbumService from '@services/AlbumService';
import Album from '@models/album';
import MainLayout from '@components/layouts/MainLayout';
import AlbumHero from '@components/albums/viewPage/AlbumHero';
import Head from 'next/head';
import ArticleContainer from '@components/ArticleContainer';
import TracklistContainer from '@components/albums/viewPage/TracklistContainer';
import ArtistService from '@services/ArtistService';
import BandService from '@services/BandService';
import AuthorOtherAlbums from '@components/albums/viewPage/AuthorOtherAlbums';

interface AlbumView {
	album: Album;
	authorAlbums: Album[];
}

const AlbumView: NextPageWithLayout<AlbumView> = ({ album, authorAlbums }) => {
	const [authorOtherAlbums, setAuthorOtherAlbums] = useState<Album[]>(authorAlbums.filter((authorAlbum) => authorAlbum.id !== album.id));

	useEffect(() => {
		setAuthorOtherAlbums(authorAlbums.filter((authorAlbum) => authorAlbum.id !== album.id));
	}, [album.id, authorAlbums]);

	return (
		<>
			<Head>
				<title>{album.title} | PowerfulDB</title>
			</Head>
			<AlbumHero album={album}/>
			<div className="flex flex-col gap-12 md:gap-16 px-5 md:px-10 lg:px-14 py-8 mt-5 md:mt-10 mx-auto max-w-screen-lg w-full">
				<ArticleContainer article={album.article}/>
				<TracklistContainer tracks={album.tracks} fullDuration={album.full_duration}/>
				<AuthorOtherAlbums albums={authorOtherAlbums}/>
			</div>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const slug = context.params?.slug;

	let album;
	try {
		album = await AlbumService.getAlbum(slug as string);
	} catch (ex) {
		return {
			notFound: true
		};
	}

	let authorAlbums = null;
	if (album.artist) {
		const { results } = await ArtistService.getArtistAlbumList(album.artist.id, { ordering: 'release_date', size: 100 });
		authorAlbums = results;
	} else if (album.band) {
		const { results } = await BandService.getBandAlbumList(album.band.id, { ordering: 'release_date', size: 100 });
		authorAlbums = results;
	}

	return {
		props: {
			album,
			authorAlbums
		}
	};
};

export default AlbumView;

AlbumView.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
