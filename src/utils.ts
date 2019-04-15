import fetch from 'node-fetch';
import { IResultUserData, IGithubUserInfoData } from './common/props';


export function getUserData(page: number): Promise<IResultUserData> {
  return fetch(`https://api.github.com/search/users?page=${page}&per_page=100&q=location:China`).then(res => res.json());
}

export function getUserInfoData(username: string): Promise<IGithubUserInfoData> {
  return fetch(`https://api.github.com/users/${username}?client_id=eee&client_secret=eee`).then(res => res.json());
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}