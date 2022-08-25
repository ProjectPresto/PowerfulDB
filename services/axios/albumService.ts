import Album from "../../models/album";
import HttpServices from "./httpService";

class AlbumService {
  async getAllAlbums() {
    const { data } = await HttpServices.http.get<Album[]>("/album/");
    return data;
  }
}

export default new AlbumService();
