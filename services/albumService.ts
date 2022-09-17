import HttpService from "./HttpService";
import GenericService from "./GenericService";
import Album, { AlbumArticle } from "../models/album";
import { Pagination, UrlQueries } from "../models/generic";

interface GetAlbumListResponse extends Pagination {
  results: Album[];
}

class AlbumService extends GenericService {
  async getAlbumList(urlQueries: UrlQueries) {
    return super.getList<GetAlbumListResponse>("album", urlQueries);
  }

  async getAlbum(slug: string) {
    return super.getItem<Album>("album", slug);
  }
}

export default new AlbumService();
