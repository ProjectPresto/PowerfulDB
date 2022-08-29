export default interface User {
  id: number;
  username: string;
  email: string;
}

export interface LoginUser {
  username: string;
  password: string;
}

export interface Contributor {
  id: number;
  username: string;
  about_text: string;
  profile_picture: string;
  profile_picture_url: string;
  user: number;
}
