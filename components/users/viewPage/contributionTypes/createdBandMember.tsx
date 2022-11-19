import { ContributedBandMember } from '@models/user';
import type { NextComponentType, NextPageContext } from 'next';
import Link from 'next/link';

interface Props {
	username: string;
	bandMember: ContributedBandMember;
}

const CreatedBandMember: NextComponentType<NextPageContext, {}, Props> = ({ username, bandMember }: Props) => {
	return (
		<>
			<span className="material-symbols-rounded !text-lg xl:!text-xl">person_add</span>
			<p>
				{`${username} added `}
				{bandMember.artist__name ? (
					<Link href={`/artist/${bandMember.artist__slug}`} className="font-bold text-primary-accent hover:underline">
						{bandMember.artist__name}
					</Link>
				) : (
					<span className="font-bold">{bandMember.name}</span>
				)}
				{` as a member to the band called `}
				<Link href={`/band/${bandMember.band__slug}`} className="font-bold text-primary-accent hover:underline">
					{bandMember.band__name}
				</Link>
			</p>
			<span className="text-gray-500 italic hidden md:inline">+ 1 point</span>
		</>
	);
};

export default CreatedBandMember;
