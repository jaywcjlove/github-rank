import fetch from 'node-fetch';

export interface IUserData {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: string;
  score: number;
}


export interface IResultUserData {
  total_count: number;
  incomplete_results: boolean;
  items: IUserData[];
}

export function getUserData(page: number): Promise<IResultUserData> {
  return fetch(`https://api.github.com/search/users?page=${page}&per_page=100&q=location:China`).then(res => res.json());
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}