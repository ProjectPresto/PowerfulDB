export default interface User {
	id: number;
	username: string;
	email: string;
}

export interface LoginUser {
	username: string;
	password: string;
}

interface ContributionsCount {
	created_albums: number;
	created_tracks: number;
	created_artists: number;
	created_bands: number;
	created_genres: number;
	created_band_members: number;
	total: number;
	points: number;
}

interface BareboneContributor {
	id: number;
	username: string;
	about_text?: string;
	profile_picture?: string;
	profile_picture_url?: string;
	user: number;
}

export interface SimplifiedContributor extends BareboneContributor {
	contributions_count: ContributionsCount;
}

export interface Contributor extends BareboneContributor {
	contributions: {
		counts: ContributionsCount;
		data: [ContributedAlbum, ContributedTracks, ContributedArtist, ContributedBand, ContributedGenres, ContributedBandMember] | [];
	};
}

interface ContributedData {
	id: number;
	created_at: string;
}

export interface ContributedAlbum extends ContributedData {
	type: 'Album';
	title: string;
	slug: string;
	release_type: 'LP' | 'Single' | 'Compilation' | 'EP' | 'Live' | 'Remix' | 'Soundtrack' | 'Other';
	artist__name?: string;
	artist__slug?: string;
	band__name?: string;
	band__slug?: string;
}

export interface ContributedTracks extends ContributedData {
	type: 'Track';
	tracks_count: number;
	album__title: string;
	album__slug: string;
}

export interface ContributedArtist extends ContributedData {
	type: 'Artist';
	name: string;
	slug: string;
}

export interface ContributedBand extends ContributedData {
	type: 'Band';
	name: string;
	slug: string;
}

export interface ContributedGenres extends ContributedData {
	type: 'Genre';
	album_genres__title: string;
	album_genres__slug: string;
	genres_count: number;
}

export interface ContributedBandMember extends ContributedData {
	type: 'BandMember';
	artist__name?: string;
	artist__slug?: string;
	name?: string;
	band__name: string;
	band__slug: string;
}

export const getContributionsCountAsArray = (contributionsCount: ContributionsCount, withoutSummary: boolean) => {
	const arrayWithoutSummary = [
		{ 'label': 'Albums', 'value': contributionsCount.created_albums, icon: 'album' },
		{ 'label': 'Tracks', 'value': contributionsCount.created_tracks, icon: 'library_music' },
		{ 'label': 'Artists', 'value': contributionsCount.created_artists, icon: 'mic_external_on' },
		{ 'label': 'Bands', 'value': contributionsCount.created_bands, icon: 'groups' },
		{ 'label': 'Genres', 'value': contributionsCount.created_genres, icon: 'collections_bookmark' },
		{ 'label': 'Members', 'value': contributionsCount.created_band_members, icon: 'person_add' }
	];
	return withoutSummary ? arrayWithoutSummary : [
		...arrayWithoutSummary, { 'label': 'Total', 'value': contributionsCount.total, icon: 'done_all' },
		{ 'label': 'Points', 'value': contributionsCount.points, icon: 'scoreboard' }
	];
};