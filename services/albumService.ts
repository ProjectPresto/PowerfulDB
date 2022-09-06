import HttpService from "./HttpService";
import Album from "../models/album";

interface AlbumResponse {
  count: number;
  next: string;
  previous: string;
  results: Album[];
}

class AlbumService {
  async getAllAlbums(page: number | null = null, size: number | null = null) {
    const { data } = await HttpService.http.get<AlbumResponse>(`/album/?page=${page ?? 1}${size && `&size=${size}`}`);
    return data;
  }
}

export default new AlbumService();
