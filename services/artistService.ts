import HttpService from "./HttpService";
import GenericService from "./GenericService";
import Artist from "../models/artist";
import { Pagination, urlQueries } from "../models/generic";

interface ArtistListResponse extends Pagination {
  results: Artist[];
}

class ArtistService extends GenericService {
  async getArtistList(urlQueries: urlQueries) {
    return super.getList<ArtistListResponse>("artist", urlQueries);
  }
}

export default new ArtistService();
