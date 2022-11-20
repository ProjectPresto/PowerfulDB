import type { NextComponentType, NextPageContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { Contributor } from '@models/user';

interface Props {
	contributor: Contributor;
}

const ContributorCard: NextComponentType<NextPageContext, {}, Props> = ({ contributor }: Props) => {
	return (
		<Link href={`/user/${contributor.id}`}>
			<div className="bg-primary-dark rounded-2xl overflow-hidden cursor-pointer">
				<div className="bg-primary-accent relative py-2 md:py-4 px-2 flex items-center justify-center">
					<div className="relative h-12 md:h-14 lg:h-16 rounded-full aspect-square shadow-lg">
						<Image
							src={contributor.profile_picture || contributor.profile_picture_url || 'https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg'}
							alt={`${contributor.username} profile picture`}
							width={300}
							height={300}
							className="object-cover object-center rounded-full aspect-square"
						/>
					</div>
				</div>
				<div className="flex items-center justify-center truncate px-2 md:px-4 py-3 md:py-5">
					<h3 className="font-bold text-base md:text-xl truncate" title={contributor.username}>
						{contributor.username}
					</h3>
				</div>
			</div>
		</Link>
	);
};

export default ContributorCard;
