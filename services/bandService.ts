import HttpService from "./HttpService";
import GenericService from "./GenericService";
import Band from "../models/band";
import { Pagination, urlQueries } from "../models/generic";

interface BandListResponse extends Pagination {
  results: Band[];
}

class BandService extends GenericService {
  async getBandList(urlQueries: urlQueries) {
    return super.getList<BandListResponse>("band", urlQueries);
  }
}

export default new BandService();
