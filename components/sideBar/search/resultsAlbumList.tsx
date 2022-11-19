import type { NextComponentType, NextPageContext } from 'next';
import Link from 'next/link';
import Image from 'next/image';

import Album from '@models/album';

import defaultArtCover from '@public/images/no_image.jpg';

interface Props {
	albums: Album[];
}

const ResultsAlbumList: NextComponentType<NextPageContext, {}, Props> = ({ albums }: Props) => {
	return albums.length ? (
		<div>
			<p className="text-lg font-bold pb-2">Albums</p>
			<div className="space-y-4">
				{albums.map((album) => (
					<Link key={album.id} href={`/album/${album.slug}`} className="block">
						<div className="w-full flex h-12 gap-2 items-center group">
							<div className="aspect-square relative w-12 h-12 group-hover:scale-90 transition-transform">
								<Image
									src={album.art_cover || album.art_cover_url || defaultArtCover}
									alt={`${album.title} art cover`}
									// layout="fill"
									className="aspect-square object-cover object-center"
								/>
							</div>
							<div className="flex flex-col w-auto truncate">
								<p className="truncate group-hover:text-primary-accent ">{album.title}</p>
								<p className="truncate text-sm italic group-hover:text-primary-accent">{album.artist?.name || album.band?.name}</p>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	) : null;
};

export default ResultsAlbumList;
