import HttpService from "./HttpService";
import GenericService from "./GenericService";
import Album from "../models/album";
import { Pagination, UrlQueries } from "../models/generic";

interface AlbumListResponse extends Pagination {
  results: Album[];
}

class AlbumService extends GenericService {
  async getAlbumList(urlQueries: UrlQueries) {
    return super.getList<AlbumListResponse>("album", urlQueries);
  }
}

export default new AlbumService();
