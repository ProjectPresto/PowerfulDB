import HttpService from "./HttpService";
import Artist from "../models/artist";
import GenericService from "./GenericService";
import { GenericResponse } from "../models/generic";

interface ArtistListResponse extends GenericResponse {
  results: Artist[];
}

class ArtistService extends GenericService {
  async getPaginatedArtistList(page?: number, size?: number) {
    return super.getPaginatedList<ArtistListResponse>("artist", page, size);
  }
}

export default new ArtistService();
