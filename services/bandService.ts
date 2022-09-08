import HttpService from "./HttpService";
import Band from "../models/band";
import { Pagination } from "../models/generic";
import GenericService from "./GenericService";

interface BandListResponse extends Pagination {
  results: Band[];
}

class BandService extends GenericService {
  async getPaginatedBandList(page?: number, size?: number) {
    return super.getPaginatedList<BandListResponse>("band", page, size);
  }
}

export default new BandService();
