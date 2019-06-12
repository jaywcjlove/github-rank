import fetch from 'node-fetch';
import path from 'path';
import dotenv, { DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import FS from 'fs-extra';
import { IResultUserData, IGithubUserInfoData } from '../common/props';
import cheerio from 'cheerio';


interface DotenvParsedOption extends DotenvParseOutput{
  ID: string;
  SECRET: string;
}

interface DotenvParse extends DotenvConfigOutput {
  parsed?: DotenvParsedOption;
}

let oauth: string = '';

if (FS.pathExistsSync(path.join(process.cwd(), '.env'))) {
  const conf = dotenv.config() as DotenvParse;
  if (conf.parsed && conf.parsed.ID && conf.parsed.SECRET) {
    oauth = `client_id=${conf.parsed.ID}&client_secret=${conf.parsed.SECRET}`;
  }
}

export function getUserData(page: number, isChina?: boolean): Promise<IResultUserData> {
  return fetch(`https://api.github.com/search/users?page=${page}&per_page=100&q=${isChina ? 'location:China' : 'followers:>1000'}${oauth && `&${oauth}`}`)
    .then(res => {
      console.log(`   Github API 获取用户计数: ${res.headers.get('x-ratelimit-limit')}/${res.headers.get('x-ratelimit-remaining')}`);
      console.log('   时间:', `${res.headers.get('x-ratelimit-reset')}000`);
      return res.json();
    });
}

/**
 * Get user info data
 * @param {string} username
 * https://developer.github.com/v3/#rate-limiting
 * `X-RateLimit-Limit` The maximum number of requests you're permitted to make per hour.
 * `X-RateLimit-Remaining` The number of requests remaining in the current rate limit window.
 * `X-RateLimit-Reset` The time at which the current rate limit window resets in UTC epoch seconds.
 */
export function getUserInfoData(username: string, client_id?: string, client_secret?: string): Promise<IGithubUserInfoData> {
  if (client_id && client_secret) {
    oauth = `client_id=${client_id}&client_secret=${client_secret}`;
  }
  return fetch(`https://api.github.com/users/${username}?${oauth}`)
    .then(res => {
      console.log(`   Github API 获取用户计数: ${res.headers.get('x-ratelimit-limit')}/${res.headers.get('x-ratelimit-remaining')}`);
      console.log('   时间:', `${res.headers.get('x-ratelimit-reset')}000`);
      return res.json();
    });
}

/**
 * Get the total count of stars.
 * @param username 
 * @param page 
 */
export async function getUserStarsData(username: string, repos: number, count: number = 0) {
  if (!repos) {
    console.log(`  仓库总数不存在无法获取 star 总数！`)
    return count
  }
  
  const pages = Math.ceil(repos / 100);
  const page = pages === 1 ? repos : 100;
  let i = pages;
  let reposData: IReposData[] = [];

  while (i--) {
    await fetch(`https://api.github.com/users/${username}/repos?per_page=${page}&page=${i + 1}?${oauth}`)
      .then(res => {
        console.log(`   Github API 获取用户总 Star 计数: ${res.headers.get('x-ratelimit-limit')}/${res.headers.get('x-ratelimit-remaining')}`);
        console.log('   时间:', `${res.headers.get('x-ratelimit-reset')}000`);
        return res.json();
      }).then((data: IReposData[]) => {
        reposData = reposData.concat(data);
      });
  }
  reposData.forEach((item: IReposData) => {
    if (item.stargazers_count) {
      count += item.stargazers_count;
    }
  });
  return count;
}


export interface IReposData {
  stargazers_count?: number;
  [key: string]: any;
}

export interface IResultReposData {
  total_count: number;
  incomplete_results: boolean;
  items: IReposData[];
}

/**
 * Get repositories data
 * @param page Page number
 */
export function getReposData(page: number): Promise<IResultReposData> {
  return fetch(`https://api.github.com/search/repositories?q=stars:>8000&page=${page}&per_page=100`)
    .then(res => {
      console.log(`   Github API 获取用户计数: ${res.headers.get('x-ratelimit-limit')}/${res.headers.get('x-ratelimit-remaining')}`);
      console.log('   时间:', `${res.headers.get('x-ratelimit-reset')}000\n`);
      return res.json();
    });
}

export interface ITrendingData {
  full_name: string;
  language: string;
  color: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  rank: number;
  todayStar: string;
}

export function getTrendingData(type: string = 'daily') {
  return fetch(`https://github.com/trending?since=${type}`)
    .then(res => res.buffer())
    .then((data) => {
      const resultData: ITrendingData[] = [];
      const html = data.toString();
      const $ = cheerio.load(html)
      $('.Box-row').each(function(idx, item) {
        const full_name = $(item).find('h1 a').text().replace(/(\n|\s)/g, '');
        const href = $(item).find('h1 a').attr('href').replace(/(\n|\s)/g, '');
        const language = $(item).find('span[itemprop=programmingLanguage]').text().replace(/(\n|\s)/g, '');
        const languageColor = $(item).find('span.repo-language-color');
        const stargazers_count = $(item).find('a.muted-link svg.octicon.octicon-star').parent().text().replace(/(\n|\s|,)/g, '');
        const todayStar = $(item).find('span.float-sm-right svg.octicon.octicon-star').parent().text().replace(/(\n|,)/g, '').trim();
        const description = $(item).find('p.text-gray').text().replace(/(\n)/g, '').trim();
        let color = '';
        if (language && languageColor && languageColor.css) {
          color = languageColor.css('background-color');
        }
        resultData.push({ full_name, language, color, description, stargazers_count: Number(stargazers_count), todayStar, html_url: `https://github.com${href}`, rank: idx + 1 });
      });
      return resultData;
    });
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export interface IToutiaoData {
  title: string;
  description: string;
  votes: string;
  url: string;
  avatar: string;
  avatarAlt: string;
  subjectName: string;
  homeUrl: string;
} 

export function getToutiaoData(day: number = 7) {
  return fetch(`https://toutiao.io/posts/hot/${day}`)
    .then(res => res.buffer())
    .then((data) => {
      const html = data.toString();
      const $ = cheerio.load(html);
      const toutiaoData: IToutiaoData[] = [];
      $('.container .posts .post').each((idx, item) => {
        const title: string = $(item).find('h3.title a').text();
        const url: string = $(item).find('h3.title a').attr('href');
        const description: string = $(item).find('p.summary a').text();
        const votes: string = $(item).find('.upvote .like-button span').text();
        const avatar: string = $(item).find('.user-info .user-avatar img').attr('src');
        const avatarAlt: string = $(item).find('.user-info .user-avatar img').attr('alt');
        const subjectName: string = $(item).find('.subject-name a').text();
        const homeUrl: string = $(item).find('.subject-name a').attr('href');
        toutiaoData.push({ title, description, votes, url, avatar, avatarAlt,
          subjectName, homeUrl
        });
      });
      return toutiaoData;
    });
}

export interface I36KrData {
  id: number;
  title: string;
  description: string;
  created_at: string;
  [key: string]: any;
}

export function get36KrData(page: number = 100): Promise<I36KrData[]> {
  return fetch(`https://36kr.com/pp/api/newsflash?per_page=${page}`)
    .then(res => res.json())
    .then((data) => {
      if (data && data.data && data.data.items) {
        return data.data.items;
      } else {
        return [];
      }
    });
}