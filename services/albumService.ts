import HttpServices from "./httpService";
import Album from "../models/album";

class AlbumService {
  async getAllAlbums() {
    const { data } = await HttpServices.http.get<Album[]>("/album/");
    return data;
  }
}

export default new AlbumService();
