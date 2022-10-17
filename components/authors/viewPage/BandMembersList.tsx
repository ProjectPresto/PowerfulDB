import type { NextComponentType, NextPageContext } from 'next';
import Link from 'next/link';
import _ from 'lodash';

import { useContributorContext } from '@context/contributorProvider';
import Band from '@models/band';
import { useShowLoginContext } from '@context/showLoginProvider';
import BandMemberCard from '@components/authors/viewPage/BandMemberCard';

interface Props {
	band: Band;
}

const BandMembersList: NextComponentType<NextPageContext, {}, Props> = ({ band }: Props) => {
	const { contributor } = useContributorContext();
	const { toggleLoginComponent } = useShowLoginContext();

	const groupedMembers = _.chain(band.band_members)
		.groupBy((member) => !!member.quit_year)
		.map((value, key) => (
			{ hasQuitYear: key, members: value }
		))
		.sortBy((obj) => _.indexOf(['false', 'true'], obj.hasQuitYear))
		.value();

	return (
		<div>
			<div className="flex items-center gap-2 md:gap-4">
				<h1 className="section-title">Members</h1>
				{/*TODO: Add Member button*/}
			</div>

			<hr className="section-hr"/>

			{groupedMembers.length !== 0 ? <>
				{groupedMembers.map(({ hasQuitYear, members }) => (
					<div key={hasQuitYear}>
						<div className="mt-8 mb-12">
							<h3 className="text-xl capitalize">{hasQuitYear === 'true' ? 'Past' : 'Current'} members</h3>

							<hr className="w-52 border-t-2 border-t-gray-400 mt-1 mb-8"/>

							{members.map((member, index) => <div key={member.id}>
								<BandMemberCard member={member} index={index}/>
								{index !== members.length - 1 && <hr className="my-8 border-t-2 border-t-gray-700 w-[80%] mx-auto"/>}
							</div>)}
						</div>
					</div>
				))}
			</> : <div className="article-style text-justify">
				<p>This band has no added members.{' '}
					{contributor ? (
						<Link href={'create-band-member-link'}>
							<a className="hover:underline text-primary-accent">You can go ahead and add them</a>
						</Link>
					) : (
						<button onClick={() => toggleLoginComponent()}>
							<a className="hover:underline text-primary-accent">Log in to add them.</a>
						</button>
					)}
				</p>
			</div>}
		</div>
	);
};

export default BandMembersList;