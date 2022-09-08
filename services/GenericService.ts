import HttpService from "./HttpService";

abstract class GenericClass {
  protected getPaginatedUrl(path: string, page?: number, size?: number) {
    let url = `/${path}/`;
    if (page) {
      url += `?page=${page}`;
      if (size) url += `&size=${size}`;
    }
    return url;
  }

  public async getPaginatedList<T>(path: string, page?: number, size?: number) {
    const { data } = await HttpService.http.get<T>(this.getPaginatedUrl(path, page, size));
    return data;
  }
}

export default GenericClass;
