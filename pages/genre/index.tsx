import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { ReactElement } from 'react';

import { NextPageWithLayout } from '@pages/_app';
import GenreService from '@services/GenreService';
import GenreCard from '@components/genres/GenreCard';
import MainLayout from '@components/layouts/MainLayout';
import TitleComponent from '@components/generic/TitleComponent';
import PaginationComponent from '@components/generic/PaginationComponent';
import Genre from '@models/genre';
import { Pagination, UrlQueries } from '@models/generic';
import TextFilterComponent from '@components/generic/filters/TextFilterComponent';
import SelectFilterComponent from '@components/generic/filters/SelectFilterComponent';

interface GenreIndex {
	genres: Genre[];
	pagination: Pagination;
}

const GenreIndex: NextPageWithLayout<GenreIndex> = ({ genres, pagination }) => {
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
				<title>Genre List | PowerfulDB</title>
			</Head>
			<div className="px-6 lg:px-14 py-8">
				<TitleComponent content="Genre list"/>
				<div className="flex justify-between">
					<div className="flex mb-10 gap-5">
						<TextFilterComponent placeholder="Genre name..." filterUrl="name__icontains"/>
					</div>
					<SelectFilterComponent instanceId="genre-page-size-select" options={pageSizeOptions} filterUrl="size" placeholder="Page size..."
					                       isClearable={true}/>
				</div>
				<div className="space-y-8 md:space-y-14">
					{genres.map((genre) => (
						<GenreCard key={genre.id} genre={genre}/>
					))}
				</div>
				<PaginationComponent pagination={pagination}/>
			</div>
		</>
	);
};

export default GenreIndex;

export const getServerSideProps: GetServerSideProps = async ({ query }: { query: UrlQueries }) => {
	const { object_count, page_count, next, previous, results: genres } = await GenreService.getGenreList({ ...query });

	return {
		props: {
			genres, pagination: {
				object_count, page_count, next, previous
			}
		}
	};
};

GenreIndex.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
