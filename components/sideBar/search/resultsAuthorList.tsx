import type { NextComponentType, NextPageContext } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';

import Artist from '@models/artist';
import Band from '@models/band';

import defaultBgImage from '@public/images/no_image.jpg';

interface Props {
	artists: Artist[];
	bands: Band[];
}

const ResultsAuthorList: NextComponentType<NextPageContext, {}, Props> = ({ artists, bands }: Props) => {
	const renderAuthor = (array: Artist[] | Band[], type: 'artist' | 'band'): ReactNode | null => {
		return array.length ? (
			<div>
				<p className="text-lg font-bold pb-2">{type === 'artist' ? 'Artists' : 'Bands'}</p>
				<div className="space-y-4">
					{array.map((author) => (
						<Link key={author.id} href={`/${type}/${author.slug}`} className="block">
							<div className="w-full flex h-12 gap-2 items-center group">
								<div
									className="aspect-square relative w-12 h-12 rounded-full group-hover:scale-90 transition-transform">
									<Image
										src={author.bg_image || author.bg_image_url || defaultBgImage}
										alt={`${author.name} background image`}
										width={75}
										height={75}
										className="aspect-square rounded-full object-cover object-center"
									/>
								</div>
								<div className="truncate">
									<p className="truncate group-hover:text-primary-accent">{author.name}</p>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		) : null;
	};
	return (
		<>
			{renderAuthor(artists, 'artist')}
			{renderAuthor(bands, 'band')}
		</>
	);
};

export default ResultsAuthorList;
