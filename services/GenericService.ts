import HttpService from "./HttpService";
import { urlQueries } from "../models/generic";

abstract class GenericClass {
  protected getUrl(path: string, urlQueries: urlQueries) {
    let url = `/${path}/`;

    Object.entries(urlQueries).forEach(([key, value], index) => {
      if (index === 0) url += `?${key}=${value}`;
      else url += `&${key}=${value}`;
    });
    return url;
  }

  public async getList<T>(path: string, urlQueries: urlQueries) {
    const { data } = await HttpService.http.get<T>(this.getUrl(path, urlQueries));
    return data;
  }
}

export default GenericClass;
