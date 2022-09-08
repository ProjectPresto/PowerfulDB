import HttpService from "./HttpService";
import Album from "../models/album";
import { Pagination } from "../models/generic";
import GenericService from "./GenericService";

interface AlbumListResponse extends Pagination {
  results: Album[];
}

class AlbumService extends GenericService {
  async getPaginatedAlbumList(page?: number, size?: number) {
    return super.getPaginatedList<AlbumListResponse>("album", page, size);
  }
}

export default new AlbumService();
