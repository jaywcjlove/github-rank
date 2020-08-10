import { SearchUsersResponseData, UsersGetByUsernameResponseData, UsersGetAuthenticatedResponseData, SearchReposResponseData } from '@octokit/types';

export type UsersDataBase = SearchUsersResponseData['items'][0] & {
  rank?: number;
}

export type UsersData = Omit<UsersGetByUsernameResponseData, 'plan' | 'twitter_username'>  & {
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

export type RepoData = SearchReposResponseData['items'][0];
