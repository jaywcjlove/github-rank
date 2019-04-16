import fetch from 'node-fetch';
import { IResultUserData, IGithubUserInfoData } from './common/props';


export function getUserData(page: number): Promise<IResultUserData> {
  return fetch(`https://api.github.com/search/users?page=${page}&per_page=100&q=location:China`).then(res => res.json());
}
/**
 * Get user info data
 * @param {string} username
 * https://developer.github.com/v3/#rate-limiting
 * `X-RateLimit-Limit` The maximum number of requests you're permitted to make per hour.
 * `X-RateLimit-Remaining` The number of requests remaining in the current rate limit window.
 * `X-RateLimit-Reset` The time at which the current rate limit window resets in UTC epoch seconds.
 */
export function getUserInfoData(username: string): Promise<IGithubUserInfoData> {
  return fetch(`https://api.github.com/users/${username}?client_id=xxxxx&client_secret=xxxxx`)
    .then(res => {
      console.log('res:limit:', res.headers.get('x-ratelimit-limit'));
      console.log('res:remaining:', res.headers.get('x-ratelimit-remaining'));
      console.log('res:reset:', res.headers.get('x-ratelimit-reset'));
      return res.json();
    });
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}