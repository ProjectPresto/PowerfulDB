import type { NextComponentType, NextPageContext } from 'next';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import { getContributor } from '@store/auth';

interface Props {
	content: string;
	url?: string;
}

const TitleComponent: NextComponentType<NextPageContext, {}, Props> = ({ content, url }: Props) => {
	const contributor = useSelector(getContributor);

	return (
		<div className="mb-8">
			<div className="flex items-center justify-between flex-wrap gap-2">
				<div className="flex items-center gap-4">
					<h1 className="font-bold text-3xl md:text-4xl">{content}</h1>
					{contributor && url && (
						<Link href={url} className="material-symbols-rounded text-secondary-dark p-0.5 rounded-full bg-primary-accent">
							add
						</Link>
					)}
				</div>
			</div>
			<hr className="border-t-2 border-primary-accent mt-3"/>
		</div>
	);
};

export default TitleComponent;
