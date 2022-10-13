import Genre from './genre';
import { Article } from './generic';
import { AlbumReturnedByAuthor } from '@models/album';

export default interface Band extends SimplifiedBand {
	founding_year: number;
	breakup_year: number;
	article: BandArticle;
	albums: AlbumReturnedByAuthor[];

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
