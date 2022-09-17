import GenericService from "./GenericService";
import Band from "../models/band";
import { Pagination, UrlQueries } from "../models/generic";
import { AlbumListResponse } from "./AlbumService";

interface BandListResponse extends Pagination {
  results: Band[];
}

class BandService extends GenericService {
  async getBandList(urlQueries: UrlQueries) {
    return super.getList<BandListResponse>("band", urlQueries);
  }

  async getBandAlbumList(band_id: number, UrlQueries?: UrlQueries) {
    return super.getList<AlbumListResponse>("album", { band: band_id, ...UrlQueries });
  }
}

export default new BandService();
