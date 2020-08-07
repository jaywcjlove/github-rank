import { SearchUsersResponseData, UsersGetByUsernameResponseData, SearchReposResponseData } from '@octokit/types';

export type UsersDataBase = SearchUsersResponseData['items'][0] & {
  rank?: number;
}

export type UsersData = UsersGetByUsernameResponseData & {
  rank?: number;
} & {
  message?: string;
  documentation_url?: string;
}

export type RepoData = SearchReposResponseData['items'][0];
