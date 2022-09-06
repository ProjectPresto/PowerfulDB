import HttpService from "./HttpService";
import Album from "../models/album";
import { GenericResponse } from "../models/generic";
import GenericService from "./GenericService";

interface AlbumResponse extends GenericResponse {
  results: Album[];
}

class AlbumService extends GenericService {
  async getAllAlbums(page?: number, size?: number) {
    const { data } = await HttpService.http.get<AlbumResponse>(this.getPaginatedUrl("album", page, size));
    return data;
  }
}

export default new AlbumService();
