import HttpService from "./HttpService";
import Band from "../models/band";
import { GenericResponse } from "../models/generic";
import GenericService from "./GenericService";

interface BandResponse extends GenericResponse {
  count: number;
  next: string;
  previous: string;
  results: Band[];
}

class BandService extends GenericService {
  async getAllBands(page: number | null = null, size: number | null = null) {
    const { data } = await HttpService.http.get<BandResponse>(this.getPaginatedUrl("band", page, size));
    return data;
  }
}

export default new BandService();
