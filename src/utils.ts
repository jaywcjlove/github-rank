import fetch from 'node-fetch';
import path from 'path';
import dotenv, { DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import FS from 'fs-extra';
import { IResultUserData, IGithubUserInfoData } from './common/props';

let cid = '';
let csecret = '';

interface DotenvParsedOption extends DotenvParseOutput{
  ID: string;
  SECRET: string;
}

interface DotenvParse extends DotenvConfigOutput {
  parsed?: DotenvParsedOption;
}

if (FS.pathExistsSync(path.join(process.cwd(), '.env'))) {
  const conf = dotenv.config() as DotenvParse;
  if (conf.parsed) {
    cid = conf.parsed.ID;
    csecret = conf.parsed.SECRET;
  }
}

export function getUserData(page: number): Promise<IResultUserData> {
  return fetch(`https://api.github.com/search/users?page=${page}&per_page=100&q=location:China`)
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
  let oauth: string = '';
  if (client_id && client_secret) {
    oauth = `client_id=${client_id}&client_secret=${client_secret}`;
  } else if (cid && csecret) {
    oauth = `client_id=${cid}&client_secret=${csecret}`;
  }
  return fetch(`https://api.github.com/users/${username}?${oauth}`)
    .then(res => {
      console.log(`   Github API 获取用户计数: ${res.headers.get('x-ratelimit-limit')}/${res.headers.get('x-ratelimit-remaining')}`);
      console.log('   时间:', `${res.headers.get('x-ratelimit-reset')}000`);
      return res.json();
    });
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}