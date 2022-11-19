import type { NextComponentType, NextPageContext } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment/moment';

import { AlbumReturnedByAuthor } from '@models/album';

import defaultArtCover from '@public/images/no_image.jpg';

interface Props {
	albums: AlbumReturnedByAuthor[];
}

const AlbumsList: NextComponentType<NextPageContext, {}, Props> = ({ albums }: Props) => {
	return (
		<div className="flex flex-col justify-center items-center m-auto">
			{albums.map((album, index) => <div className="w-full" key={album.id}><Link href={`/album/${album.slug}`}>
				<div className="group flex justify-center items-center w-full cursor-pointer">
					<div className="relative group-hover:scale-95 transition-transform shadow-lg ease-in-out block aspect-square cursor-pointer
						h-28 md:h-32 lg:h-36 m-4 md:m-8 lg:m-10">
						<Image
							src={album.art_cover || album.art_cover_url || defaultArtCover}
							alt={`${album.title} art cover`}
							width={500}
							height={500}
							className="object-cover object-center aspect-square h-full w-full"
						/>
					</div>

					<div className="flex-1">
						<h2 className="text-base md:text-lg lg:text-xl font-bold">{album.title}</h2>
						<p className="text-sm md:text-base italic text-gray-400">
							{moment(album.release_date).format('MMMM D, YYYY')}
						</p>
						{album.genres.length !== 0 && (
							<p className="text-xs md:text-sm italic text-gray-400">
								{album.genres.map((g) => g.name).join(' • ')}
							</p>
						)}
					</div>

				</div>
			</Link>
				{index !== albums.length - 1 && <hr className="hr-element my-4 md:my-6 lg:my-8 border-t-2 border-t-gray-700 w-[60%] mx-auto"/>}
			</div>)}
		</div>
	);
};

export default AlbumsList;
