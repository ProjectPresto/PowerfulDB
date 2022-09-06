abstract class GenericClass {
  protected getPaginatedUrl(path: string, page?: number, size?: number) {
    let url = `/${path}/`;
    if (page) {
      url += `?page=${page}`;
      if (size) url += `&size=${size}`;
    }
    return url;
  }
}

export default GenericClass;
