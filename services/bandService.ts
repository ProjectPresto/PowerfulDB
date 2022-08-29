import HttpService from "./httpService";
import Band from "./../models/band";

class BandService {
  async getAllBands() {
    const { data } = await HttpService.http.get<Band[]>("/band/");
    return data;
  }
}

export default new BandService();
