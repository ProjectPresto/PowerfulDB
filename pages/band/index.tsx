import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { ReactElement } from 'react';

import { NextPageWithLayout } from '@pages/_app';
import BandService from '@services/BandService';
import MainLayout from '@components/layouts/MainLayout';
import AuthorCard from '@components/authors/AuthorCard';
import TitleComponent from '@components/generic/TitleComponent';
import PaginationComponent from '@components/generic/PaginationComponent';
import SelectFilterComponent from '@components/generic/filters/SelectFilterComponent';
import { SimplifiedBand } from '@models/band';
import { Pagination, UrlQueries } from '@models/generic';
import GenreFilterComponent from '@components/generic/filters/GenreFilterComponent';

interface BandIndex {
	bands: SimplifiedBand[];
	pagination: Pagination;
}

const BandIndex: NextPageWithLayout<BandIndex> = ({ bands, pagination }) => {
	const sortOptions = [
		{ value: 'name', label: 'Name Ascending' },
		{ value: '-name', label: 'Name Descending' },
		{ value: 'founding_year', label: 'Created Last' },
		{ value: '-founding_year', label: 'Created First' }
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
				<title>Band List | PowerfulDB</title>
			</Head>
			<div className="px-6 lg:px-14 py-8">
				<TitleComponent content="Band list"/>
				<div className="flex justify-between">
					<div className="flex mb-10 gap-5">
						<SelectFilterComponent instanceId="band-sort-select" options={sortOptions} filterUrl="ordering" placeholder="Sort..." isClearable={true}/>
						<GenreFilterComponent instanceId="band-genre-select" filterUrl="album__genres"/>
					</div>
					<SelectFilterComponent instanceId="band-page-size-select" options={pageSizeOptions} filterUrl="size" placeholder="Page size..."
					                       isClearable={true}/>
				</div>
				<div
					className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4
                    gap-x-4 gap-y-6 xl:gap-x-6 xl:gap-y-10 2xl:gap-y-16"
				>
					{bands.map((band) => (
						<AuthorCard key={band.id} author={band} authorType="band"/>
					))}
				</div>
				<PaginationComponent pagination={pagination}/>
			</div>
		</>
	);
};

export default BandIndex;

export const getServerSideProps: GetServerSideProps = async ({ query }: { query: UrlQueries }) => {
	const { object_count, page_count, next, previous, results: bands } = await BandService.getBandList(query);

	return {
		props: {
			bands, pagination: {
				object_count, page_count, next, previous
			}
		}
	};
};

BandIndex.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
