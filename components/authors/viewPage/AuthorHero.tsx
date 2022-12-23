import type { NextComponentType, NextPageContext } from 'next';

import Artist from '@models/artist';
import Band from '@models/band';
import Image from 'next/image';

import defaultBgImage from '@public/images/no_image.jpg';
import moment from 'moment';

interface Props {
	artist?: Artist;
	band?: Band;
}

const AuthorHero: NextComponentType<NextPageContext, {}, Props> = ({ artist, band }: Props) => {
	let genres = artist?.genres || band?.genres || [];
	if (genres.length > 3) genres.length = 3;

	return (
		<div className="flex flex-col justify-end items-start w-full h-[650px] lg:h-[750px] relative group overflow-hidden">
			<div>
				<div className="absolute inset-0">
					<Image
						src={artist?.bg_image || artist?.bg_image_url || band?.bg_image || band?.bg_image_url || defaultBgImage}
						alt={`${artist?.name || band?.name} background image`}
						width={3840}
						height={2160}
						className="object-cover object-center w-full h-full"
					/>
				</div>
				<div
					className="absolute inset-0 top-36"
					style={{
						background: 'linear-gradient(180deg, hsla(231, 11%, 12%, 0) 0%, hsla(231, 11%, 12%, 0.013) 8.1%, hsla(231, 11%, 12%, 0.049) 15.5%, hsla(231, 11%, 12%, 0.104) 22.5%, hsla(231, 11%, 12%, 0.175) 29%, hsla(231, 11%, 12%, 0.259) 35.3%, hsla(231, 11%, 12%, 0.352) 41.2%, hsla(231, 11%, 12%, 0.45) 47.1%, hsla(231, 11%, 12%, 0.55) 52.9%, hsla(231, 11%, 12%, 0.648) 58.8%, hsla(231, 11%, 12%, 0.741) 64.7%, hsla(231, 11%, 12%, 0.825) 71%, hsla(231, 11%, 12%, 0.896) 77.5%, hsla(231, 11%, 12%, 0.951) 84.5%, hsla(231, 11%, 12%, 0.987) 91.9%, hsl(231, 11%, 12%) 100%)'
					}}
				></div>
			</div>


			<div className="max-w-screen-lg mx-auto px-6 md:px-12 lg:px-14 pb-6 md:pb-8 lg:pb-10 w-full flex flex-col gap-2">
				<div className="flex flex-col-reverse md:flex-col gap-1">
					{artist?.full_name && <p className="text-gray-300 italic drop-shadow-md">{artist.full_name}</p>}
					<h3 className="font-bold text-5xl md:text-6xl lg:text-7xl drop-shadow-md">{artist?.name || band?.name}</h3>
				</div>

				{genres.length !== 0 && <p className="text-sm md:text-base lg:text-lg xl:text-xl drop-shadow-sm">{genres.join(', ')}</p>}

				{artist?.birth_date && (
					<div className="drop-shadow-sm">
						<p>{`Age: ${moment(artist.birth_date).fromNow(true)} old`}</p>

						<p className="text-gray-300">{`Born: ${moment(artist.birth_date).format('MMMM D, YYYY')}`}</p>

						{artist.death_date && <p className="text-gray-300">{`Died: ${moment(artist.death_date).format('MMMM D, YYYY')}`}</p>}
					</div>
				)}

				{band?.founding_year && <p className="drop-shadow-lg">{`Years active: ${band.founding_year} - ${band.breakup_year || 'present'}`}</p>}
			</div>
		</div>
	);
};

export default AuthorHero;
