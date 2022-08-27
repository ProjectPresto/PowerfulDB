import HttpServices from "./httpService";
import Band from "./../models/band";

class BandService {
  async getAllBands() {
    const { data } = await HttpServices.http.get<Band[]>("/band/");
    return data;
  }
}

export default new BandService();
