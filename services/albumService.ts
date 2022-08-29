import HttpService from "./httpService";
import Album from "../models/album";

class AlbumService {
  async getAllAlbums() {
    const { data } = await HttpService.http.get<Album[]>("/album/");
    return data;
  }
}

export default new AlbumService();
