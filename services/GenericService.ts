import HttpService from "./HttpService";
import { UrlQueries } from "../models/generic";

abstract class GenericClass {
  protected getUrl(path: string, urlQueries: UrlQueries) {
    let url = `/${path}/`;

    Object.entries(urlQueries).forEach(([key, value], index) => {
      if (index === 0) url += `?${key}=${value}`;
      else url += `&${key}=${value}`;
    });
    return url;
  }

  public async getList<T>(path: string, urlQueries: UrlQueries) {
    const { data } = await HttpService.http.get<T>(this.getUrl(path, urlQueries));
    return data;
  }
}

export default GenericClass;