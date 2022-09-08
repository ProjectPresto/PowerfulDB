import HttpService from "./HttpService";

abstract class GenericClass {
  protected getPaginatedUrl(path: string, page?: number, size?: number) {
    let url = `/${path}/`;
    if (page && size) url += `?page=${page}&size=${size}`;
    else if (page && !size) url += `?page=${page}`;
    else if (!page && size) url += `?size=${size}`;
    return url;
  }

  public async getPaginatedList<T>(path: string, page?: number, size?: number) {
    const { data } = await HttpService.http.get<T>(this.getPaginatedUrl(path, page, size));
    return data;
  }
}

export default GenericClass;
