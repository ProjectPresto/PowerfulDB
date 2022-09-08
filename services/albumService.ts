import HttpService from "./HttpService";
import Album from "../models/album";
import { GenericResponse } from "../models/generic";
import GenericService from "./GenericService";

interface AlbumListResponse extends GenericResponse {
  results: Album[];
}

class AlbumService extends GenericService {
  async getPaginatedAlbumList(page?: number, size?: number) {
    return super.getPaginatedList<AlbumListResponse>("album", page, size);
  }
}

export default new AlbumService();
