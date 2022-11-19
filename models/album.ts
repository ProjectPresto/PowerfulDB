import { SimplifiedArtist } from './artist';
import { SimplifiedBand } from './band';
import { Article } from './generic';
import Genre from './genre';
import { SimplifiedTrack } from './track';
import { Option } from '@components/generic/filters/SelectFilterComponent';

export default interface Album extends SimplifiedAlbum {
	artist?: SimplifiedArtist;
	band?: SimplifiedBand;
	full_duration?: string;
	tracks: SimplifiedTrack[];
	article: AlbumArticle;

	created_at: string;
	created_by: number;
	updated_at: string;
	updated_by: number;
}

export interface SimplifiedAlbum {
	id: number;
	title: string;
	slug: string;
	release_date: string;
	release_type: 'LP' | 'Single' | 'Compilation' | 'EP' | 'Live' | 'Remix' | 'Soundtrack' | 'Other';
	art_cover?: string;
	art_cover_url?: string;
	artist?: SimplifiedArtist;
	band?: SimplifiedBand;
	genres: Genre[] | [];
}

export interface AlbumReturnedByAuthor {
	id: number;
	title: string;
	slug: string;
	release_date: string;
	release_type: string;
	art_cover?: string;
	art_cover_url?: string;
	genres: Genre[] | [];
}

export interface CreateAlbum {
	title: string;
	release_date: string;
	release_type: string;
	art_cover?: string;
	artist?: number;
	band?: number;
	genres: number[];
}

export interface AlbumArticle extends Article {
	album: number;
}


export const typeOptions: Option[] = [
	{ value: 'LP', label: 'LP' },
	{ value: 'Single', label: 'Single' },
	{ value: 'Compilation', label: 'Compilation' },
	{ value: 'EP', label: 'EP' },
	{ value: 'Live', label: 'Live' },
	{ value: 'Remix', label: 'Remix' },
	{ value: 'Soundtrack', label: 'Soundtrack' },
	{ value: 'Other', label: 'Other' }
];