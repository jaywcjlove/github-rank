import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cheerio from 'cheerio';
import { resolve as resolveUrl } from 'url';
import { request } from "@octokit/request";
import formatter from '@uiw/formatter';
import { UsersDataBase, UsersData, RepoData } from '../common/props';

dotenv.config();

export async function getUserData(page: number, isChina?: boolean): Promise<UsersDataBase[]> {
  const headers: { authorization?: string; } = {};
  if (process.env.ACCESS_TOKEN) {
    headers.authorization = `token ${process.env.ACCESS_TOKEN}`
  }
  try {
    const dt = await request('GET /search/users', {
      ...{ headers },
      q: `followers:>1000${isChina ? '+location:China' : ''}`,
      page: page,
      per_page: 100,
    });
    if (dt && dt.data && dt.data.items) {
      console.log(`   Github API 获取用户计数: ${dt.headers['x-ratelimit-limit']}/${dt.headers['x-ratelimit-remaining']}`);
      console.log('   时间:', `${formatter('YYYY年MM月DD日 HH:mm:ss', new Date(Number(`${dt.headers['x-ratelimit-reset']}000`)))}`);
      return dt.data.items;
    }
    return [];
  } catch (error) {
    throw error.message || error;
  }
}

/**
 * Get user info data
 * @param {string} username
 * https://developer.github.com/v3/#rate-limiting
 * `X-RateLimit-Limit` The maximum number of requests you're permitted to make per hour.
 * `X-RateLimit-Remaining` The number of requests remaining in the current rate limit window.
 * `X-RateLimit-Reset` The time at which the current rate limit window resets in UTC epoch seconds.
 */
export async function getUserInfoData(username: string, client_id?: string, client_secret?: string): Promise<UsersData> {
  const headers: { authorization?: string; } = {};
  if (process.env.ACCESS_TOKEN) {
    headers.authorization = `token ${process.env.ACCESS_TOKEN}`
  }
  try {
    const dt = await request(`GET /users/${username}`, {
      ...{ headers },
    });
    if (dt && dt.data) {
      console.log(`   Github API 获取用户详情计数: ${dt.headers['x-ratelimit-limit']}/${dt.headers['x-ratelimit-remaining']}`);
      console.log('   时间:', `${formatter('YYYY年MM月DD日 HH:mm:ss', new Date(Number(`${dt.headers['x-ratelimit-reset']}000`)))}`);
      return dt.data;
    }
    throw '没有获取到用户信息';
  } catch (error) {
    throw error.message || error;
  }
}

/**
 * Get repositories data
 * @param page Page number
 */
export async function getReposData(page: number): Promise<RepoData[]> {
  const headers: { authorization?: string; } = {};
  if (process.env.ACCESS_TOKEN) {
    headers.authorization = `token ${process.env.ACCESS_TOKEN}`
  }
  try {
    const dt = await request(`GET /search/repositories`, {
      ...{ headers },
      q: 'stars:>8000',
      page: page,
      per_page: 100,
    });
    if (dt && dt.data && dt.data.items) {
      console.log(`   Github API 获取仓库Star排行计数: ${dt.headers['x-ratelimit-limit']}/${dt.headers['x-ratelimit-remaining']}`);
      console.log('   时间:', `${formatter('YYYY年MM月DD日 HH:mm:ss', new Date(Number(`${dt.headers['x-ratelimit-reset']}000`)))}`);
      return dt.data.items;
    }
    throw '没有获取到用户信息';
  } catch (error) {
    throw error.message || error;
  }
}

export interface ITrendingData {
  full_name: string;
  language: string;
  color: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forked: string;
  rank: number;
  todayStar: string;
}

export function getTrendingData(type: string = 'daily') {
  const apiUrl = `https://github.com/trending?since=${type}`;
  return fetch(apiUrl)
    .then(res => res.buffer())
    .then((data) => {
      const resultData: ITrendingData[] = [];
      const html = data.toString();
      const $ = cheerio.load(html)
      $('.Box-row').each(function(idx, item) {
        // 不需要头像，避免被和谐
        /* eslint-disable */
        const fullName = $(item).find('h1 a').text().replace(/(\n|\s)/g, '');
        const href = $(item).find('h1 a').attr('href').replace(/(\n|\s)/g, '');
        const language = $(item).find('span[itemprop=programmingLanguage]').text().replace(/(\n|\s)/g, '');
        const languageColor = $(item).find('span.repo-language-color');
        const todayStar = $(item).find('span.float-sm-right').text().replace(/(\n|,)/g, '').trim();
        const description = $(item).find('p.color-text-secondary').text().replace(/(\n)/g, '').trim();
        /* eslint-enable */
        let color = '';
        if (language && languageColor && languageColor.css) {
          color = languageColor.css('background-color');
        }
        let stargazersCount = '';
        let node = $(item).find('.muted-link svg[aria-label="star"].octicon.octicon-star');
        if (node && node[0] && node[0].next) {
          stargazersCount = node[0].next.data.replace(/(\n|\s|,)/g, '');
        }

        let forked = '-';
        node = $(item).find('svg[aria-label="fork"].octicon.octicon-repo-forked');
        if (node) {
          forked = node[0].next.data.replace(/(\n|\s|,)/g, '');
        }

        resultData.push({ full_name: fullName, language, color, description, forked, stargazers_count: parseInt(stargazersCount, 10), todayStar, html_url: resolveUrl(apiUrl, href), rank: idx + 1 });
      });
      return resultData;
    });
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Get User Stars
 * https://github-readme-stats.vercel.app/api?username=jaywcjlove
 * @param username User Name
 */
export function getUserStar(username: string): Promise<string> {
  return fetch(`https://github-readme-stats.vercel.app/api?username=${username}`)
    .then(res => res.buffer())
    .then((data) => {
      const html = data.toString();
      const $ = cheerio.load(html);
      let star = '';
      $('svg svg text.stat').each((idx, item) => {
        const testid = $(item).data('testid');
        if (testid === 'stars') {
          star = $(item).html() || '';
        }
      });
      return star
    });
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
