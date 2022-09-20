import HttpService from "./HttpService";
import GenericService from "./GenericService";
import Genre from "@models/genre";
import { Pagination, UrlQueries } from "@models/generic";

interface GetGenreListResponse extends Pagination {
  results: Genre[];
}

class GenreService extends GenericService {
  async getGenreList(urlQueries: UrlQueries) {
    return super.getList<GetGenreListResponse>("genre", urlQueries);
  }

  async getGenreOptionList(search: string) {
    const { data } = await HttpService.http.get<GetGenreListResponse>(this.getUrl("genre", { search }));
    const genres = data.results.map((genre) => {
      return {
        value: genre.id.toString(),
        label: genre.name,
      };
    });
    return genres;
  }
}

export default new GenreService();
