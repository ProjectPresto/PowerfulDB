import { ContributedGenres } from '@models/user';
import type { NextComponentType, NextPageContext } from 'next';
import Link from 'next/link';

interface Props {
	username: string;
	genres: ContributedGenres;
}

const CreatedGenres: NextComponentType<NextPageContext, {}, Props> = ({ username, genres }: Props) => {
	return (
		<>
			<span className="material-symbols-rounded !text-lg xl:!text-xl">collections_bookmark</span>
			<p>
				{`${username} added `}
				<span className="font-bold">{`${genres.genres_count} ${genres.genres_count === 1 ? 'genre' : 'genres'} `}</span>
				{` to the album called `}
				<Link href={`/album/${genres.album_genres__slug}`} className="italic text-main-accent hover:underline">
					{genres.album_genres__title}
				</Link>
			</p>
			<span className="text-gray-500 italic hidden md:inline">
        {`+ ${genres.genres_count} ${genres.genres_count === 1 ? ' point' : ' points'}`}
      </span>
		</>
	);
};

export default CreatedGenres;
