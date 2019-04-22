import FS from 'fs-extra';
import path from 'path';
import ejs from 'ejs';

const rootPath: string = path.join(__dirname, 'html');
const dateStr: string = `${new Date().getFullYear()}/${(new Date().getMonth()) + 1}/${new Date().getDate()}`;

export interface ICreateFollowersHTML {
  html_url: string;
  avatar_url: string;
  name: string | null;
  login: string;
  location: string;
  public_repos: number;
  followers: number;
  [key: string]: any;
}

export function creatFollowersHTML(userData: ICreateFollowersHTML[]): string {
  const filename: string = path.join(rootPath, 'followers.ejs');
  const tmpStr: string = FS.readFileSync(filename).toString();
  return ejs.render(tmpStr, { users: userData, date: dateStr }, { filename });
}

export interface IReposHTML {
  html_url: string;
  full_name: string;
  [key: string]: any;
}

export function creatReposHTML(reposData: IReposHTML[]) {
  const filename: string = path.join(rootPath, 'repos.ejs');
  const tmpStr: string = FS.readFileSync(filename).toString();
  return ejs.render(tmpStr, { repos: reposData, date: dateStr }, { filename });
}

export interface ICreateTrendingHTML {
  html_url: string;
  full_name: string;
  language: string;
  stargazers_count: number;
  todayStar: string;
  description: string;
}

export function creatTrendingHTML(trendingData: ICreateTrendingHTML[], type: string = 'daily') {
  const filename: string = path.join(rootPath, 'trending.ejs');
  const tmpStr: string = FS.readFileSync(filename).toString();
  return ejs.render(tmpStr, { trending: trendingData, date: dateStr, type }, { filename });
}