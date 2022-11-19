import GenericService from './GenericService';
import { AlbumListResponse } from './AlbumService';
import Artist from '@models/artist';
import { Pagination, UrlQueries } from '@models/generic';

interface ArtistListResponse extends Pagination {
	results: Artist[];
}

class ArtistService extends GenericService {
	async getArtistList(urlQueries?: UrlQueries) {
		return super.getList<ArtistListResponse>('artist', urlQueries);
	}

	async getArtist(slug: string) {
		return super.getItem<Artist>('artist', slug);
	}

	async getArtistAlbumList(artist_id: number, UrlQueries?: UrlQueries) {
		return super.getList<AlbumListResponse>('album', { artist: artist_id, ...UrlQueries });
	}
}

export default new ArtistService();
