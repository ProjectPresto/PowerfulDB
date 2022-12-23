import type { NextComponentType, NextPageContext } from 'next';
import groupBy from 'lodash/groupBy';
import moment from 'moment';

import { Contributor } from '@models/user';
import RenderContribution from './RenderContribution';

interface Props {
	contributor: Contributor;
}

const ContributionList: NextComponentType<NextPageContext, {}, Props> = ({ contributor }: Props) => {
	const { data } = contributor.contributions;

	const contributions = groupBy(data, (elem) => {
		return moment(elem.created_at).format('YYYY-MM-DD');
	});

	return (
		<div className="flex-1 lg:min-w-[26rem]">
			<h1 className="font-bold text-2xl xl:text-3xl">Latest contributions</h1>
			<hr className="border-t-2 border-t-primary-accent mt-1"/>

			{Object.keys(contributions).length !== 0 ? (
				<div>
					{Object.entries(contributions).map(([key, value]) => (
						<div key={key}>
							<h4 className="italic xl:text-lg mt-8 mb-2">{moment(key).format('MMMM D, YYYY')}</h4>

							<div className="flex flex-col gap-6">
								{value.map((contribution) => (
									<div key={contribution.id} className="bg-primary-dark rounded-2xl w-full px-4 py-3 md:py-4 lg:py-3 xl:py-4 2xl:py-5 md:px-5">
										<div className="flex gap-3 xl:gap-4 items-center text-sm xl:text-base">
											<RenderContribution username={contributor.username} contribution={contribution}/>
										</div>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			) : (
				<p className="mt-4">{contributor.username} has not made any contributions yet. 😭</p>
			)}
		</div>
	);
};

export default ContributionList;
