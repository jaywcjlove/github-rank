import FS from 'fs-extra';
import path from 'path';
import { creatFollowersHTML, creatReposHTML, creatTrendingHTML, ICreateFollowersHTML, IReposHTML, ICreateTrendingHTML } from './createHTML';
import usersDone from '../dist/users.json';
import reposData from '../dist/repos.json';
import trendingData from '../dist/trending.json';

(async () => {
  try {
    const users: ICreateFollowersHTML[] = [...usersDone];
    let html: string = creatFollowersHTML(users);
    FS.outputFileSync(path.join(process.cwd(), 'web', 'index.html'), html);
    console.log(`-> Follower 排行榜，页面生成成功！共${users.length}条数据！`);

    const repos: IReposHTML[] = [...reposData];
    html = creatReposHTML(repos);
    FS.outputFileSync(path.join(process.cwd(), 'web', 'repos.html'), html);
    console.log(`-> Repos 排行榜，页面生成成功！共${repos.length}条数据！`);

    const trending: ICreateTrendingHTML[] = [...trendingData];
    html = creatTrendingHTML(trending);
    FS.outputFileSync(path.join(process.cwd(), 'web', 'trending.html'), html);
    console.log(`-> Trending 趋势榜，页面生成成功！共${trending.length}条数据！`);

  } catch (error) {
    console.log(error);
  }
})()