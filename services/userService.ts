import HttpService from "./HttpService";
import GenericService from "./GenericService";
import { Pagination } from "@models/generic";
import { LoginUser } from "@models/user";
import { Contributor } from "@models/user";

interface ContributorListResponse extends Pagination {
  results: Contributor[];
}

class UserService extends GenericService {
  async getJWT(user: LoginUser) {
    const { data } = await HttpService.http.post("/auth/jwt/create/", user);
    return data;
  }

  async getContributor(userId: number) {
    try {
      const { data }: { data: ContributorListResponse } = await HttpService.http.get(`/contributor/?user=${userId}`);
      return data.results[0];
    } catch (error: any) {
      if (error.response.status === 400) {
        return this.createContributor(userId);
      }
    }
  }

  async createContributor(userId: number) {
    const { data }: { data: Contributor } = await HttpService.http.post(`/contributor/`, { user: userId });
    return data;
  }
}

export default new UserService();
