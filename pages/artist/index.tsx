import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { ReactElement } from 'react';

import { NextPageWithLayout } from '@pages/_app';
import ArtistService from '@services/ArtistService';
import MainLayout from '@components/layouts/MainLayout';
import AuthorCard from '@components/authors/AuthorCard';
import TitleComponent from '@components/TitleComponent';
import PaginationComponent from '@components/PaginationComponent';
import SelectFilterComponent from '@components/filters/SelectFilterComponent';
import { SimplifiedArtist } from '@models/artist';
import { Pagination, UrlQueries } from '@models/generic';
import GenreFilterComponent from '@components/filters/GenreFilterComponent';

interface ArtistIndex {
	artists: SimplifiedArtist[];
	pagination: Pagination;
}

const ArtistIndex: NextPageWithLayout<ArtistIndex> = ({ artists, pagination }) => {
	const sortOptions = [
		{ value: 'name', label: 'Name Ascending' },
		{ value: '-name', label: 'Name Descending' },
		{ value: 'birth_date', label: 'Oldest First' },
		{ value: '-birth_date', label: 'Youngest First' }
	];

	const pageSizeOptions = [
		{ value: '8', label: '8' },
		{ value: '16', label: '16' },
		{ value: '24', label: '24' },
		{ value: '48', label: '48' },
		{ value: '64', label: '64' },
		{ value: '96', label: '96' }
	];

	return (
		<>
			<Head>
				<title>Artist List | PowerfulDB</title>
			</Head>
			<div className="px-6 lg:px-14 py-8">
				<TitleComponent content="Artist list"/>
				<div className="flex justify-between">
					<div className="flex mb-10 gap-5">
						<SelectFilterComponent instanceId="artist-sort-select" options={sortOptions} filterUrl="ordering" placeholder="Sort..."
						                       isClearable={true}/>
						<GenreFilterComponent instanceId="artist-genre-select" filterUrl="album__genres"/>
					</div>
					<SelectFilterComponent instanceId="artist-page-size-select" options={pageSizeOptions} filterUrl="size" placeholder="Page size..."
					                       isClearable={true}/>
				</div>
				<div
					className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4
                    gap-x-4 gap-y-6 xl:gap-x-6 xl:gap-y-10 2xl:gap-y-16"
				>
					{artists.map((artist) => (
						<AuthorCard key={artist.id} author={artist} authorType="artist"/>
					))}
				</div>
				<PaginationComponent pagination={pagination}/>
			</div>
		</>
	);
};

export default ArtistIndex;

export const getServerSideProps: GetServerSideProps = async ({ query }: { query: UrlQueries }) => {
	const { object_count, page_count, next, previous, results: artists } = await ArtistService.getArtistList(query);

	return {
		props: {
			artists, pagination: {
				object_count, page_count, next, previous
			}
		}
	};
};

ArtistIndex.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
