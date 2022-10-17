import type { NextComponentType, NextPageContext } from 'next';
import Link from 'next/link';

import { BandMember } from '@models/band';
import Image from 'next/image';

import defaultArtCover from '@public/images/no_image.jpg';

interface Props {
	member: BandMember;
	index: number;
}

const BandMemberCard: NextComponentType<NextPageContext, {}, Props> = ({ member }: Props) => {
	return (
		<div className="flex items-center w-full my-9">
			{(
				member.artist?.bg_image || member.artist?.bg_image_url
			) && (
				<Link href={`/artist/${member.artist.slug}`}>
					<div
						className="relative h-24 md:h-28 lg:h-32 ml-0 md:ml-6 lg:ml-10 aspect-square rounded-full shadow-xl border-2 border-primary-dark
					  hover:shadow-accent hover:border-primary-accent transition-all duration-100 ease-in-out cursor-pointer"
					>
						<Image
							src={member.artist.bg_image || member.artist.bg_image_url || defaultArtCover}
							alt={`${member.artist.name} background image`}
							layout="fill"
							className="aspect-square object-cover object-center rounded-full"
						/>
					</div>
				</Link>
			)}
			<div className="ml-4 md:ml-8 lg:ml-10">
				<div className="flex flex-col md:flex-row items-start md:items-center gap-0 md:gap-2">
					{member.name && <h2 className="text-lg md:text-xl lg:text-2xl">{member.name}</h2>}
					{member.artist && <Link href={`/artist/${member.artist.slug}`}>
            <a className="text-lg md:text-xl lg:text-2xl hover:text-primary-accent transition-colors">
							{member.artist.name}
            </a>
          </Link>}
					{member.join_year && (
						<>
							<p className="mb-1 text-gray-600 hidden md:block">|</p>
							<p className="italic text-gray-400 text-xs md:text-sm lg:text-base">
								{`${member.join_year} - ${member.quit_year ?? 'present'}`}
							</p>
						</>
					)}
				</div>
				<p className="text-sm md:text-base mt-1 text-gray-400 !two-line-truncate" title={member.roles}>
					{member.roles}
				</p>
			</div>

			{/* TODO: Edit button */}

		</div>
	);
};

export default BandMemberCard;