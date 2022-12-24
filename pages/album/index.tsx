import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { ReactElement } from 'react';

import { NextPageWithLayout } from '@pages/_app';
import AlbumService from '@services/AlbumService';
import AlbumCard from '@components/albums/AlbumCard';
import MainLayout from '@components/layouts/MainLayout';
import TitleComponent from '@components/TitleComponent';
import PaginationComponent from '@components/PaginationComponent';
import SelectFilterComponent from '@components/filters/SelectFilterComponent';
import GenreFilterComponent from '@components/filters/GenreFilterComponent';
import Album from '@models/album';
import { Pagination, UrlQueries } from '@models/generic';

interface AlbumIndex {
	albums: Album[];
	pagination: Pagination;
}

const AlbumIndex: NextPageWithLayout<AlbumIndex> = ({ albums, pagination }) => {
	const sortOptions = [
		{ value: 'title', label: 'TitleComponent Ascending' },
		{ value: '-title', label: 'TitleComponent Descending' },
		{ value: 'release_date', label: 'Oldest First' },
		{ value: '-release_date', label: 'Newest First' }
	];

	const typeOptions = [
		{ value: 'LP', label: 'LP' },
		{ value: 'Single', label: 'Single' },
		{ value: 'Compilation', label: 'Compilation' },
		{ value: 'EP', label: 'EP' },
		{ value: 'Live', label: 'Live' },
		{ value: 'Remix', label: 'Remix' },
		{ value: 'Soundtrack', label: 'Soundtrack' },
		{ value: 'Other', label: 'Other' }
	];

	const pageSizeOptions = [
		{ value: '6', label: '6' },
		{ value: '12', label: '12' },
		{ value: '24', label: '24' },
		{ value: '36', label: '36' },
		{ value: '48', label: '48' },
		{ value: '64', label: '64' },
		{ value: '96', label: '96' }
	];

	return (
		<>
			<Head>
				<title>Album List | PowerfulDB</title>
			</Head>
			<div className="px-6 lg:px-14 py-8">
				<TitleComponent content="Album list" url="/album/create"/>
				<div className="flex justify-between">
					<div className="flex mb-10 gap-5">
						<SelectFilterComponent
							instanceId="album-sort-select"
							options={sortOptions}
							filterUrl="ordering"
							placeholder="Sort..."
							isClearable={true}
						/>
						<GenreFilterComponent instanceId="album-genre-select" filterUrl="genres"/>
						<SelectFilterComponent
							instanceId="album-release-type-select"
							options={typeOptions}
							filterUrl="release_type"
							placeholder="Release type..."
							isClearable={true}
						/>
					</div>
					<SelectFilterComponent instanceId="album-page-size-select" options={pageSizeOptions} filterUrl="size" placeholder="Page size..."
					                       isClearable={true}/>
				</div>
				<div
					className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6
                    gap-x-4 md:gap-x-8 gap-y-8 md:gap-y-12"
				>
					{albums.map((album) => (
						<AlbumCard key={album.id} album={album} config={{ showArtist: true, showGenres: true }}/>
					))}
				</div>
				<PaginationComponent pagination={pagination}/>
			</div>
		</>
	);
};

export default AlbumIndex;

export const getServerSideProps: GetServerSideProps = async ({ query }: { query: UrlQueries }) => {
	const { object_count, page_count, next, previous, results: albums } = await AlbumService.getAlbumList(query);

	return {
		props: {
			albums, pagination: {
				object_count, page_count, next, previous
			}
		}
	};
};

AlbumIndex.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
