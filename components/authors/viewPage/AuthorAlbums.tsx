import type { NextComponentType, NextPageContext } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import _ from 'lodash';

import Artist from '@models/artist';
import Band from '@models/band';
import AlbumsList from '@components/albums/AlbumsList';
import { useContributorContext } from '@context/contributorProvider';
import AlbumCard from '@components/albums/AlbumCard';

interface Props {
	artist?: Artist;
	band?: Band;
}

const AuthorAlbums: NextComponentType<NextPageContext, {}, Props> = ({ artist, band }: Props) => {
	const { contributor } = useContributorContext();
	const providedAlbums = artist?.albums || band?.albums;
	const [viewType, setViewType] = useState<string | null>('');

	useEffect(() => {
		setViewType(localStorage.getItem('authorAlbumViewType') ?? 'grid');
	}, []);

	const handleViewTypeChange = (viewType: string, releaseType: string) => {
		setViewType(viewType);
		localStorage.setItem('authorAlbumViewType', viewType);
		scrollToTop(`${releaseType.toLowerCase()}-container`);
	};

	const scrollToTop = (id: string) => {
		window.scrollTo({
			top: (
				document.getElementById(id)?.offsetTop || 0
			) - 60
		});
	};

	const typesOrder = ['LP', 'Single', 'Compilation', 'EP', 'Live', 'Remix', 'Soundtrack', 'Other'];
	const groupedAlbums = _.chain(providedAlbums)
		.groupBy('release_type')
		.map((value, key) => (
			{ releaseType: key, albums: value }
		))
		.sortBy((obj) => _.indexOf(typesOrder, obj.releaseType))
		.value();

	return <>
		{groupedAlbums.map(({ releaseType, albums }) => (
			<div key={releaseType} className="w-full m-auto" id={`${releaseType.toLowerCase()}-container`}>
				<div className="flex gap-5 justify-between items-center">
					<div className="flex items-center gap-2 md:gap-4">
						<h1 className="section-title">
							{`${releaseType === 'LP' ? 'Long Play' : releaseType} Albums`}
						</h1>
						{contributor && (
							<Link
								href={`/album/create/?author=${(
									artist ? 'artist-' : 'band-'
								) + (
									artist?.id || band?.id
								)}&author_name=${artist?.name || band?.name}&release_type=${releaseType}`}
								className="material-symbols-rounded text-secondary-dark p-0.5 rounded-full bg-primary-accent"
							>
								add
							</Link>
						)}
					</div>

					<div className="flex gap-2 md:gap-4">
						<button className="material-symbols-rounded !text-3xl" type="button" onClick={() => handleViewTypeChange('grid', releaseType)}>
							grid_view
						</button>
						<button className="material-symbols-rounded !text-3xl" type="button" onClick={() => handleViewTypeChange('list', releaseType)}>
							list
						</button>
					</div>
				</div>

				<hr className="section-hr"/>

				{viewType === 'grid' ?
					(
						<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-x-4 lg:gap-x-6 xl:gap-x-8 gap-y-6 md:gap-y-12">
							{albums.map((album) => (
								<AlbumCard key={album.id} album={album} config={{ showYear: true }}/>
							))}
						</div>
					) :
					<AlbumsList albums={albums}/>}
			</div>
		))}
	</>;
};

export default AuthorAlbums;
