import Genre from './genre';
import { Article } from './generic';
import { AlbumReturnedByAuthor } from '@models/album';
import Band from '@models/band';

export default interface Artist extends SimplifiedArtist {
	full_name?: string;
	birth_date?: string;
	death_date?: string;
	article?: ArtistArticle;
	albums: AlbumReturnedByAuthor[] | [];
	band_memberships: ArtistMembership[] | [];

	created_at: string;
	created_by: number;
	updated_at: string;
	updated_by: number;
}

export interface SimplifiedArtist {
	id: number;
	name: string;
	slug: string;
	bg_image?: string;
	bg_image_url?: string;
	genres: Genre[] | [];
}

export interface ArtistArticle extends Article {
	artist: number;
}

export interface ArtistMembership {
	id: number;
	band: Band;
	join_year?: number;
	quit_year?: number;
	roles?: string;
}