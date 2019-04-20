
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
  site_admin: boolean;
  score: number;
  followers?: number; // 排序
  rank?: number; // 排序
}

export interface IGithubUserInfoData extends IUserData {
  name: string | null;
  company: string | null;
  blog: string;
  location: string;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  score: number;
  created_at: string;
  updated_at: string;
  rank?: number; // 排序
  [key: string]: any;
  // Github API 被限制返回的字段
  // documentation_url?: string;
  // message?: string;
}

export interface IResultUserData {
  total_count: number;
  incomplete_results: boolean;
  items: IUserData[];
}

export interface IUserMoreInfo {
  count: number;    // 当前抓取到第几个用户信息
  errors: IUserData[]; // 请求错误的第几个用户
  users: Array<IGithubUserInfoData>;
}