import type { NextComponentType, NextPageContext } from 'next';
import Link from 'next/link';

import { ContributedBand } from '@models/user';

interface Props {
	username: string;
	band: ContributedBand;
}

const CreatedBand: NextComponentType<NextPageContext, {}, Props> = ({ username, band }: Props) => {
	return (
		<>
			<span className="material-symbols-rounded !text-lg xl:!text-xl">groups</span>
			<p>
				{`${username} created band called `}
				<Link href={`/band/${band.slug}`} className="font-bold text-primary-accent hover:underline">
					{band.name}
				</Link>
			</p>
			<span className="text-gray-500 italic hidden md:inline">+ 3 points</span>
		</>
	);
};

export default CreatedBand;
