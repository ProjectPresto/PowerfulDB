import { Tokens } from "../models/generic";
import { LoginUser } from "../models/user";
import HttpService from "./HttpService";
import { Contributor } from "../models/user";

class UserService {
  async getJWT(user: LoginUser) {
    const { data } = await HttpService.http.post("/auth/jwt/create/", user);
    return data;
  }

  async getContributor(userId: number) {
    try {
      const { data }: { data: Contributor[] } = await HttpService.http.get(`/contributor/?user=${userId}`);
      return data[0];
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
