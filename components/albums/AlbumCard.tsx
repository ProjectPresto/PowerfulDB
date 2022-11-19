import type { NextComponentType, NextPageContext } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Album, { SimplifiedAlbum } from '@models/album';

import defaultArtCover from '@public/images/no_image.jpg';

interface Props {
	album: Album | SimplifiedAlbum;
}

const AlbumCard: NextComponentType<NextPageContext, {}, Props> = ({ album }: Props) => {
	const router = useRouter();
	const genreText = album.genres?.map((genre) => genre.name).join(', ');

	return (
		<div className="group">
			<Link href={`/album/${album.slug}`}>
				<div className="relative group-hover:scale-95 transition-transform shadow-lg ease-in-out block cursor-pointer">
					<Image
						src={album.art_cover || album.art_cover_url || defaultArtCover}
						alt={`${album.title} art cover`}
						width={500}
						height={500}
						className="object-cover object-center aspect-square"
					/>
					{album.release_type !== 'LP' && !router.query.release_type && (
						<div
							className="absolute bottom-0 right-0 text-xs md:text-sm font-bold bg-secondary-accent pr-1 md:pr-2
                      pl-2 md:pl-3 py-1 rounded-tl-xl md:rounded-tl-2xl"
						>
							{album.release_type}
						</div>
					)}
				</div>
			</Link>

			<div className="flex flex-col px-1 py-2 xl:p-2 truncate">
				<h3 className="font-bold text-sm lg:text-base xl:text-lg truncate">
					<Link href={`/album/${album.slug}`}>
						{album.title}
					</Link>
				</h3>

				<p className="text-sm truncate italic">
					<Link href={album.artist !== null ? `/artist/${album.artist?.slug}` : `/band/${album.band?.slug}`}>
						{album.artist?.name || album.band?.name}
					</Link>
				</p>

				{genreText && (
					<p className="text-xs truncate italic text-gray-400" title={genreText}>
						{genreText}
					</p>
				)}
			</div>
		</div>
	);
};

export default AlbumCard;
