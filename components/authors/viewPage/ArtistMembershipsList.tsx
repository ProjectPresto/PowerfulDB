import type { NextComponentType, NextPageContext } from 'next';
import Link from 'next/link';
import Image from 'next/image';

import Artist from '@models/artist';

import defaultBgImage from '@public/images/no_image.jpg';

interface Props {
	artist: Artist;
}

const ArtistMembershipsList: NextComponentType<NextPageContext, {}, Props> = ({ artist }: Props) => {
	return (
		<div>
			<h1 className="section-title">Band Memberships</h1>

			<hr className="section-hr"/>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
				{artist.band_memberships.map((membership, index) => (
					<Link key={membership.id} href={`/band/${membership.band.slug}`}>
						<div
							className={`group relative overflow-hidden flex items-center justify-center rounded-2xl h-40 md:h-48 cursor-pointer
							${artist.band_memberships.length % 2 !== 0 && index === artist.band_memberships.length - 1 && 'col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-2'}`}>
							<div
								className="absolute w-full h-full object-center object-cover opacity-[15%] group-hover:opacity-[35%] group-hover:scale-105 transition">
								<Image
									src={membership.band.bg_image || membership.band.bg_image_url || defaultBgImage}
									alt={`${membership.band.name} background image`}
									layout="fill"
									className="object-center object-cover"
								/>
							</div>

							<div className="z-10 flex flex-col items-center justify-center w-full h-full group gap-0 md:gap-1">

								<h1
									className="font-sans text-3xl md:text-4xl relative after:cool-underline after:bg-main-light group-hover:after:cool-underline-hover
									drop-shadow-md"
								>
									{membership.band.name}
								</h1>

								<p className="text-center max-w-xs text-xs md:text-sm drop-shadow-md two-line-truncate px-4" title={membership.roles}>
									{membership.roles}
								</p>

								<p className="text-gray-200 text-sm md:text-base italic drop-shadow-md">
									{`${membership.join_year} - ${membership.quit_year ?? 'present'}`}
								</p>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default ArtistMembershipsList;