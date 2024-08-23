import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { load } from 'cheerio';
import url from 'url';
import { request } from "@octokit/request";
import formatter from '@uiw/formatter';
import { UsersDataBase, UsersData, RepoData } from '../common/props.js';

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
      console.log(`   Github API 获取用户计数: ${dt.headers['x-ratelimit-limit']}/\x1b[32;1m${dt.headers['x-ratelimit-remaining']}\x1b[0m`);
      console.log('   时间:', `${formatter('YYYY年MM月DD日 HH:mm:ss', new Date(Number(`${dt.headers['x-ratelimit-reset']}000`)))}`);
      return dt.data.items;
    }
    return [];
  } catch (error) {
    if (error instanceof Error) {
      throw error.message || error;
    }
    return []
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
export async function getUserInfoData(username: string, client_id?: string, client_secret?: string): Promise<UsersData | undefined> {
  const headers: { authorization?: string; } = {};
  if (process.env.ACCESS_TOKEN) {
    headers.authorization = `token ${process.env.ACCESS_TOKEN}`
  }
  try {
    const dt = await request(`GET /users/${username}`, {
      ...{ headers },
    });
    if (dt && dt.data) {
      console.log(`   Github API 获取用户详情计数: ${dt.headers['x-ratelimit-limit']}/\x1b[32;1m${dt.headers['x-ratelimit-remaining']}\x1b[0m`);
      console.log('   时间:', `${formatter('YYYY年MM月DD日 HH:mm:ss', new Date(Number(`${dt.headers['x-ratelimit-reset']}000`)))}`);
      return dt.data;
    }
    throw '没有获取到用户信息';
  } catch (error) {
    if (error instanceof Error) {
      throw error.message || error;
    }
  }
}

/**
 * Get repositories data
 * @param page Page number
 */
export async function getReposData(page: number): Promise<RepoData[] | undefined> {
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
      console.log(`   Github API 获取仓库Star排行计数: ${dt.headers['x-ratelimit-limit']}/\x1b[32;1m${dt.headers['x-ratelimit-remaining']}\x1b[0m`);
      console.log('   时间:', `${formatter('YYYY年MM月DD日 HH:mm:ss', new Date(Number(`${dt.headers['x-ratelimit-reset']}000`)))}`);
      return dt.data.items;
    }
    throw '没有获取到用户信息';
  } catch (error) {
    if (error instanceof Error) {
      throw error.message || error;
    }
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
    .then(res => res.arrayBuffer())
    .then((buf) => {
      const resultData: ITrendingData[] = [];
      const enc = new TextDecoder("utf-8");
      const html = enc.decode(buf);
      const $ = load(html)
      $('.Box-row').each(function (idx, item) {
        // 不需要头像，避免被和谐
        const fullName = $(item).find('h2 a').text().replace(/(\n|\s)/g, '');
        const href = $(item).find('h2 a').attr('href')?.replace(/(\n|\s)/g, '');
        const language = $(item).find('span[itemprop=programmingLanguage]').text().replace(/(\n|\s)/g, '');
        const languageColor = $(item).find('span.repo-language-color');
        const todayStar = $(item).find('span.float-sm-right').text().replace(/(\n|,)/g, '').trim();
        const description = $(item).find('p.color-fg-muted').text().replace(/(\n)/g, '').trim();
        if (!fullName) {
          throw new Error(`${apiUrl}: fullName is null`);
        }
        if (!href) {
          throw new Error(`${apiUrl}\n\n${fullName}: href is null`);
        }
        if (!todayStar) {
          throw new Error(`${apiUrl}\n\n${fullName}: todayStar is null`);
        }
        // if (!language) {
        //   throw new Error(`${apiUrl}\n\n${fullName}: language is null`);
        // }
        // if (!languageColor) {
        //   throw new Error(`${apiUrl}\n\n${fullName}: languageColor is null`);
        // }
        // if (!description) {
        //   throw new Error(`${fullName}: description is null`);
        // }
        let color = '';
        if (language && languageColor && languageColor.css) {
          color = languageColor.css('background-color');
        }
        let stargazersCount = '';
        let node = $(item).find('svg[aria-label="star"].octicon.octicon-star');
        if (node && node[0] && node[0].next) {
          stargazersCount = node[0].next?.data?.replace(/(\n|\s|,)/g, '') || '';
        }

        let forked = '-';
        node = $(item).find('svg[aria-label="fork"].octicon.octicon-repo-forked');
        if (node) {
          forked = node[0].next?.data?.replace(/(\n|\s|,)/g, '') || '';
        }

        resultData.push({ full_name: fullName, language, color, description, forked, stargazers_count: parseInt(stargazersCount, 10), todayStar, html_url: url.resolve(apiUrl, href), rank: idx + 1 });
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
    .then(res => res.arrayBuffer())
    .then((buf) => {
      const enc = new TextDecoder('utf-8');
      const html = enc.decode(buf);
      const $ = load(html);
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
