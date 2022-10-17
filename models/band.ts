import Genre from './genre';
import { Article } from './generic';
import { AlbumReturnedByAuthor } from '@models/album';
import Artist from '@models/artist';

export default interface Band extends SimplifiedBand {
	founding_year: number;
	breakup_year: number;
	article?: BandArticle;
	albums: AlbumReturnedByAuthor[] | [];
	band_members: BandMember[] | [];

	created_at: string;
	created_by: number;
	updated_at: string;
	updated_by: number;
}

export interface SimplifiedBand {
	id: number;
	name: string;
	slug: string;
	bg_image: string | null;
	bg_image_url: string | null;
	genres: Genre[] | [];
}

export interface BandArticle extends Article {
	band: number;
}

export interface BandMember {
	id: number,
	artist?: Artist,
	name?: string,
	roles?: string,
	join_year?: number,
	quit_year?: number,

	created_at: string;
	created_by: number;
	updated_at: string;
	updated_by: number;
}