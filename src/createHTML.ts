import FS from 'fs-extra';
import path from 'path';
import ejs from 'ejs';
import { ISifou } from './utils/getSifou';

import { IToutiaoData, I36KrData } from './utils'

const rootPath: string = path.join(__dirname, 'html');
const dateStr: string = `${new Date().getFullYear()}/${(new Date().getMonth()) + 1}/${new Date().getDate()}`;

export interface ICreateFollowersHTML {
  html_url: string;
  avatar_url: string;
  name: string | null;
  login: string;
  location: string | null;
  public_repos: number;
  followers: number;
  [key: string]: any;
}

export function creatFollowersHTML(userData: ICreateFollowersHTML[], type: string): string {
  const filename: string = path.join(rootPath, 'followers.ejs');
  const tmpStr: string = FS.readFileSync(filename).toString();
  let title = 'GitHub China User Ranking.';
  if (type === 'global') {
    title = 'GitHub Users Global Ranking.'
  }
  return ejs.render(tmpStr, { title, users: userData, date: dateStr, type }, { filename });
}

export interface IReposHTML {
  html_url: string;
  full_name: string;
  [key: string]: any;
}

export function creatReposHTML(reposData: IReposHTML[]) {
  const filename: string = path.join(rootPath, 'repos.ejs');
  const tmpStr: string = FS.readFileSync(filename).toString();
  return ejs.render(tmpStr, { title: 'GitHub Repositories Ranking.', repos: reposData, date: dateStr }, { filename });
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
  return ejs.render(tmpStr, { title: 'GitHub Repositories Trending', trending: trendingData, date: dateStr, type }, { filename });
}

export function creatSifouHTML(sifouData: ISifou[], type: string = 'daily') {
  const filename: string = path.join(rootPath, 'sifou.ejs');
  const tmpStr: string = FS.readFileSync(filename).toString();
  return ejs.render(tmpStr, { title: 'Segmentfault 思否热门', data: sifouData, date: dateStr, type }, { filename });
}


export function creatToutiaoHTML(data: IToutiaoData[], day: number = 7) {
  const filename: string = path.join(rootPath, `toutiao.ejs`);
  const tmpStr: string = FS.readFileSync(filename).toString();
  return ejs.render(tmpStr, { title: `开发者头条 - 最近${day}天热门分享`, data, date: dateStr, day }, { filename });
}


export function creat36KrHTML(data: I36KrData[]) {
  const filename: string = path.join(rootPath, `36kr.ejs`);
  const tmpStr: string = FS.readFileSync(filename).toString();
  return ejs.render(tmpStr, { title: `36Kr快讯`, data, date: dateStr }, { filename });
}
