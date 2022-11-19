import type { NextComponentType, NextPageContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment/moment';

import { AlbumReturnedByAuthor } from '@models/album';

import defaultArtCover from '@public/images/no_image.jpg';

interface Props {
	albums: AlbumReturnedByAuthor[];
}

const AlbumsGrid: NextComponentType<NextPageContext, {}, Props> = ({ albums }: Props) => {
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-x-4 lg:gap-x-6 xl:gap-x-8 gap-y-6 md:gap-y-12">
			{albums.map(album => <Link key={album.id} href={`/album/${album.slug}`}>
				<div className="group">
					<div className="relative group-hover:scale-95 transition-transform shadow-lg ease-in-out block cursor-pointer">
						<Image
							src={album.art_cover || album.art_cover_url || defaultArtCover}
							alt={`${album.title} art cover`}
							width={400}
							height={400}
							className="object-cover object-center aspect-square w-full h-full"
						/>
					</div>

					<div className="flex flex-col px-1 py-2 xl:p-2 truncate">
						<h3 className="font-bold text-sm lg:text-base xl:text-lg truncate">
							{album.title}
						</h3>

						<p className="text-xs md:text-sm truncate text-gray-400">
							{moment(album.release_date).format('YYYY')}
						</p>
					</div>
				</div>
			</Link>)}
		</div>
	);
};

export default AlbumsGrid;