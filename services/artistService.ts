import HttpService from "./httpService";
import Artist from "./../models/artist";

class ArtistService {
  async getAllArtists() {
    const { data } = await HttpService.http.get<Artist[]>("/artist/");
    return data;
  }
}

export default new ArtistService();
