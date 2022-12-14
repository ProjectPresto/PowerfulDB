import GenericService from './GenericService';
import Album from '@models/album';
import { Pagination, UrlQueries } from '@models/generic';

export interface AlbumListResponse extends Pagination {
	results: Album[];
}

class AlbumService extends GenericService {
	async getAlbumList(urlQueries?: UrlQueries) {
		return super.getList<AlbumListResponse>('album', urlQueries);
	}

	async getAlbum(slug: string) {
		return super.getItem<Album>('album', slug);
	}

	async postAlbum(album: object, config: object) {
		return super.postItem<Album>('album', album, config);
	}
}

export default new AlbumService();
