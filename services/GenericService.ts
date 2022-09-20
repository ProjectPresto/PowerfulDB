import HttpService from "./HttpService";
import { UrlQueries } from "@models/generic";

abstract class GenericClass {
  protected getUrl(path: string, urlQueries: UrlQueries) {
    let url = `/${path}/`;

    Object.entries(urlQueries).forEach(([key, value], index) => {
      if (Array.isArray(value)) {
        value.forEach((param, paramIndex) => {
          if (paramIndex === 0 && index === 0) url += `?${key}=${param}`;
          else url += `&${key}=${param}`;
        });
      } else {
        if (index === 0) url += `?${key}=${value}`;
        else url += `&${key}=${value}`;
      }
    });
    return url;
  }

  public async getList<T>(path: string, urlQueries: UrlQueries) {
    const { data } = await HttpService.http.get<T>(this.getUrl(path, urlQueries));
    return data;
  }

  public async getItem<T>(path: string, lookup: string | number) {
    const { data } = await HttpService.http.get<T>(`/${path}/${lookup}/`);
    return data;
  }
}

export default GenericClass;
