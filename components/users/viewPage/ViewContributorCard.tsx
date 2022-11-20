import { Contributor } from '@models/user';
import type { NextComponentType, NextPageContext } from 'next';
import Image from 'next/image';

interface Props {
	contributor: Contributor;
}

const ViewContributorCard: NextComponentType<NextPageContext, {}, Props> = ({ contributor }: Props) => {
	const {
		total, points, createdAlbums, createdTracks, createdArtists, createdBands, createdGenres, createdBandMembers
	} = contributor.contributions.counts;

	const countsList = [
		{ value: createdAlbums, icon: 'album', label: 'Albums' },
		{ value: createdTracks, icon: 'library_music', label: 'Tracks' },
		{ value: createdArtists, icon: 'mic_external_on', label: 'Artists' },
		{ value: createdBands, icon: 'groups', label: 'Bands' },
		{ value: createdGenres, icon: 'collections_bookmark', label: 'Genres' },
		{ value: createdBandMembers, icon: 'person_add', label: 'Members' },
		{ value: 0, icon: 'feed', label: 'Articles' },
		{ value: 0, icon: 'edit', label: 'Edits' }
	];
	return (
		<div
			className="rounded-3xl bg-primary-dark overflow-hidden h-fit xl:max-w-sm mx-auto
                flex flex-col sm:flex-row xl:flex-col"
		>
			<div className="bg-primary-accent py-4 px-4 sm:px-6 flex flex-col gap-2 md:gap-4 sm:w-fit xl:w-full justify-center">
				<div className="flex flex-wrap w-full gap-2 md:gap-4 items-center">
					<div className="relative h-12 sm:h-16 xl:h-20 aspect-square">
						<Image
							src={contributor.profile_picture || contributor.profile_picture_url || 'https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg'}
							alt={`${contributor.username} profile picture`}
							width={300}
							height={300}
							className="object-center object-cover rounded-full aspect-square"
						/>
					</div>
					<h2 className="text-base md:text-lg lg:text-base xl:text-lg font-bold text-secondary-dark" title={contributor.username}>
						{contributor.username}
					</h2>
				</div>

				<div className="text-secondary-dark sm:w-max">
					<p className="italic text-sm sm:text-base md:text-sm xl:text-base">
						Contributions: <span className="font-bold">{total}</span>
						{' • '}
						Points: <span className="font-bold">{points}</span>
					</p>
				</div>

				{contributor?.about_text && (
					<div className="text-secondary-dark max-w-xs text-sm md:text-base lg:text-sm xl:text-base">{contributor.about_text}</div>
				)}
			</div>

			<div
				className="py-6 px-4 sm:p-6 grid gap-x-2 gap-y-4 m-auto text-center w-full sm:w-auto xl:w-full
                grid-cols-3 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4"
			>
				{countsList.map((element) => (
					<div key={element.label}>
						<p className="lg:text-lg font-bold flex justify-center gap-1 items-center">
							<span className="material-symbols-rounded !text-base lg:!text-lg">{element.icon}</span>
							{element.value}
						</p>
						<p className="text-sm xl:text-base">{element.label}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default ViewContributorCard;
