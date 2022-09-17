import GenericService from "./GenericService";
import Artist from "../models/artist";
import { Pagination, UrlQueries } from "../models/generic";
import { AlbumListResponse } from "./AlbumService";

interface ArtistListResponse extends Pagination {
  results: Artist[];
}

class ArtistService extends GenericService {
  async getArtistList(urlQueries: UrlQueries) {
    return super.getList<ArtistListResponse>("artist", urlQueries);
  }

  async getArtistAlbumList(artist_id: number, UrlQueries?: UrlQueries) {
    return super.getList<AlbumListResponse>("album", { artist: artist_id, ...UrlQueries });
  }
}

export default new ArtistService();
