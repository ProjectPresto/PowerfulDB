import type { NextComponentType, NextPageContext } from 'next';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import { getContributor } from '@store/auth';
import { toggleLoginModal } from '@store/helpers';
import { useAppDispatch } from '@helpers/hooks';
import { getContributionsCountAsArray } from '@models/user';

const IntroductionComponent: NextComponentType<NextPageContext, {}> = () => {
	const contributor = useSelector(getContributor);
	const dispatch = useAppDispatch();

	let arrayOfContributionsCount = null;
	if (contributor) {
		arrayOfContributionsCount = getContributionsCountAsArray(contributor.contributions_count, true);
	}

	return (
		<div id="introduction" className="">
			<h1 className="text-4xl font-bold">
				Hi {contributor ? contributor.username : 'Stranger'}! Welcome to PowerfulDB
				<motion.div
					style={{
						marginBottom: '-20px',
						marginRight: '-45px',
						paddingBottom: '20px',
						paddingRight: '45px',
						display: 'inline-block'
					}}
					animate={{ rotate: 20 }}
					transition={{
						repeat: Infinity,
						repeatType: 'reverse',
						from: 0,
						duration: 0.3,
						ease: 'easeInOut',
						type: 'tween'
					}}>
					👋
				</motion.div>
			</h1>
			<div className="pt-2 text-gray-400 max-w-3xl">
				<p>
					Learn more about your favorite bands and discover new, exciting music opportunities.
					For&nbsp;more&nbsp;information got to <Link href="/about" className="underline">about</Link> section.
				</p>
				{!contributor && (
					<p className={'pt-2'}>
						I can see that you&apos;re not logged in yet. Go ahead and{' '}
						<a onClick={() => dispatch(toggleLoginModal(true))} className="cursor-pointer underline">
							log in
						</a>
					</p>
				)}
			</div>
			{contributor && <div className={'text-gray-400 pt-2'}>
        Your contributions:{' '}
				{arrayOfContributionsCount && arrayOfContributionsCount.map((contribution, index) => (
					<span key={contribution.label} className={''}>
						<span className={'text-primary-accent'}>{contribution.value}</span>
						&nbsp;{contribution.label}&nbsp;
						{index !== arrayOfContributionsCount.length - 1 && ' | '}
					</span>
				))}
      </div>}
		</div>
	);
};

export default IntroductionComponent;