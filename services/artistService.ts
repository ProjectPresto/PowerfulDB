import HttpService from "./HttpService";
import Artist from "../models/artist";
import GenericService from "./GenericService";
import { GenericResponse } from "../models/generic";

interface ArtistResponse extends GenericResponse {
  results: Artist[];
}

class ArtistService extends GenericService {
  async getAllArtists(page?: number, size?: number) {
    const { data } = await HttpService.http.get<ArtistResponse>(this.getPaginatedUrl("artist", page, size));
    return data;
  }
}

export default new ArtistService();
