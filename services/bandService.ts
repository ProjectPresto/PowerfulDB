import GenericService from "./GenericService";
import { AlbumListResponse } from "./AlbumService";
import Band from "@models/band";
import { Pagination, UrlQueries } from "@models/generic";

interface BandListResponse extends Pagination {
  results: Band[];
}

class BandService extends GenericService {
  async getBandList(urlQueries: UrlQueries) {
    return super.getList<BandListResponse>("band", urlQueries);
  }

  async getBand(slug: string) {
    return super.getItem<Band>("band", slug);
  }

  async getBandAlbumList(band_id: number, UrlQueries?: UrlQueries) {
    return super.getList<AlbumListResponse>("album", { band: band_id, ...UrlQueries });
  }
}

export default new BandService();
