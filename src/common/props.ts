import { Endpoints } from "@octokit/types";

type listReposResponse = Endpoints["GET /search/repositories"]["response"];
type listUserReposResponse = Endpoints["GET /search/users"]["response"];

export type UsersDataBase = listUserReposResponse["data"]["items"][0] & {
  rank?: number;
}

export type UsersData = Omit<UsersDataBase, 'plan' | 'twitter_username'>  & {
  rank?: number;
  twitter_username?: string;
  /**
   * GitHub 用户的 Star 总数
   */
  _stars?: string;
} & {
  message?: string;
  documentation_url?: string;
}

export type RepoData = listReposResponse['data']['items'][0];
