import HttpService from "./HttpService";
import GenericService from "./GenericService";
import { Pagination, UrlQueries } from "@models/generic";
import { LoginUser } from "@models/user";
import { Contributor } from "@models/user";
import { SimplifiedContributor } from "./../models/user";

interface ContributorListResponse extends Pagination {
  results: SimplifiedContributor[];
}

class UserService extends GenericService {
  async getJWT(user: LoginUser) {
    const { data } = await HttpService.http.post("/auth/jwt/create/", user);
    return data;
  }

  async createContributor(userId: number) {
    const { data }: { data: SimplifiedContributor } = await HttpService.http.post(`/contributor/`, { user: userId });
    return data;
  }

  async getContributor(userId: number) {
    try {
      const { data }: { data: Contributor } = await HttpService.http.get(`/contributor/${userId}/`);
      return data;
    } catch (error: any) {
      if (error.response.status === 400) {
        return this.createContributor(userId);
      }
    }
  }

  async getContributorList(urlQueries: UrlQueries) {
    return super.getList<ContributorListResponse>("contributor", urlQueries);
  }
}

export default new UserService();
