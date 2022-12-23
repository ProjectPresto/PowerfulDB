import type { NextComponentType, NextPageContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment';

import Album from '@models/album';

import defaultArtCover from '@public/images/no_image.jpg';

interface Props {
	album: Album;
}

const AlbumHero: NextComponentType<NextPageContext, {}, Props> = ({ album }: Props) => {
	return (
		<div className="flex mt-8 md:mt-12 lg:mt-16 justify-center w-full">
			<div className="flex flex-col md:flex-row justify-center items-center gap-5 xl:gap-10 max-w-screen-xl px-4 md:px-12 lg:px-16">
				<div className="relative block aspect-square group overflow-hidden">
					<Image
						src={album.art_cover || album.art_cover_url || defaultArtCover}
						alt={`${album.title} art cover`}
						width={600}
						height={600}
						className="aspect-square object-cover object-center w-64 md:w-72 lg:w-96"
					/>
					{// TODO: Edit button
					}
				</div>
				<div className="flex flex-col items-center md:items-start gap-1 md:gap-2">
					<Link href={album.artist ? `/artist/${album.artist?.slug}` : `/band/${album.band?.slug}`} className="hover:underline text-lg lg:text-2xl">
						{album.artist?.name || album.band?.name}
					</Link>

					<h1 className="text-2xl lg:text-4xl font-bold text-center md:text-left">{album.title}</h1>

					<p className="text-gray-400 text-sm lg:text-base">
						{album.release_date && `${moment(album.release_date).format('MMMM D, YYYY')} | `} {album.release_type}
					</p>

					{album.genres?.length !== 0 && (
						<div className="text-sm md:text-base italic text-center md:text-left">{album.genres?.map((g) => g.name).join(' • ')}</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default AlbumHero;
