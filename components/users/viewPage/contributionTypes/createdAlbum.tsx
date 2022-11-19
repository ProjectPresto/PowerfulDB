import type { NextComponentType, NextPageContext } from 'next';
import Link from 'next/link';

import { ContributedAlbum } from '@models/user';

interface Props {
	username: string;
	album: ContributedAlbum;
}

const CreatedAlbum: NextComponentType<NextPageContext, {}, Props> = ({ username, album }: Props) => {
	return (
		<>
			<span className="material-symbols-rounded !text-lg xl:!text-xl">album</span>
			<p>
				{`${username} added ${album.release_type === 'LP' ? 'album' : album.release_type.toLowerCase()} called `}
				<Link href={`/album/${album.slug}`} className="font-bold text-primary-accent hover:underline">
					{album.title}
				</Link>
				{' by '}
				<Link href={album.artist__name ? `/artist/${album.artist__slug}` : `/band/${album.band__slug}`}
				      className="italic text-primary-accent hover:underline">
					{album.artist__name || album.band__name}
				</Link>
			</p>
			<span className="text-gray-500 italic hidden md:inline">+ 3 points</span>
		</>
	);
};

export default CreatedAlbum;
