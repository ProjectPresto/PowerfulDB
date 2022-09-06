import HttpService from "./HttpService";
import Artist from "../models/artist";

interface ArtistResponse {
  count: number;
  next: string;
  previous: string;
  results: Artist[];
}

class ArtistService {
  async getAllArtists(page: number | null = null, size: number | null = null) {
    const { data } = await HttpService.http.get<ArtistResponse>(`/artist/?page=${page ?? 1}${size && `&size=${size}`}`);
    return data;
  }
}

export default new ArtistService();
