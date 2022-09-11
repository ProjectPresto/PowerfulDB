import HttpService from "./HttpService";
import GenericService from "./GenericService";
import Artist from "../models/artist";
import { Pagination, UrlQueries } from "../models/generic";

interface ArtistListResponse extends Pagination {
  results: Artist[];
}

class ArtistService extends GenericService {
  async getArtistList(urlQueries: UrlQueries) {
    return super.getList<ArtistListResponse>("artist", urlQueries);
  }
}

export default new ArtistService();
