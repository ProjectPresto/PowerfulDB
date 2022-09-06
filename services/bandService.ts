import HttpService from "./HttpService";
import Band from "../models/band";

interface BandResponse {
  count: number;
  next: string;
  previous: string;
  results: Band[];
}

class BandService {
  async getAllBands(page: number | null = null, size: number | null = null) {
    const { data } = await HttpService.http.get<BandResponse>(`/band/?page=${page ?? 1}${size && `&size=${size}`}`);
    return data;
  }
}

export default new BandService();
