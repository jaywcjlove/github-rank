import FS from 'fs-extra';
import path from 'path';
import { creatFollowersHTML, creatReposHTML, creatTrendingHTML, ICreateFollowersHTML, IReposHTML, ICreateTrendingHTML } from './createHTML';
import usersDone from '../dist/users.json';
import usersChinaDone from '../dist/users.china.json';
import reposData from '../dist/repos.json';
import trendingDailyData from '../dist/trending-daily.json';
import trendingWeeklyData from '../dist/trending-weekly.json';
import trendingMonthlyData from '../dist/trending-monthly.json';

(async () => {
  try {
    let users: ICreateFollowersHTML[] = [...usersDone];
    let html: string = creatFollowersHTML(users, 'global');
    FS.outputFileSync(path.join(process.cwd(), 'web', 'index.html'), html);
    console.log(`> 全球用户 Follower 排行榜，页面生成成功！共${users.length}条数据！`);

    users = [...usersChinaDone];
    html = creatFollowersHTML(users, 'china');
    FS.outputFileSync(path.join(process.cwd(), 'web', 'users.china.html'), html);
    console.log(`> 中国用户 Follower 排行榜，页面生成成功！共${users.length}条数据！`);

    const repos: IReposHTML[] = [...reposData];
    html = creatReposHTML(repos);
    FS.outputFileSync(path.join(process.cwd(), 'web', 'repos.html'), html);
    console.log(`> Repos 排行榜，页面生成成功！共${repos.length}条数据！`);

    let trending: ICreateTrendingHTML[] = [...trendingDailyData];
    html = creatTrendingHTML(trending, 'daily');
    FS.outputFileSync(path.join(process.cwd(), 'web', 'trending.html'), html);
    console.log(`> Trending 日趋势榜，页面生成成功！共${trending.length}条数据！`);

    trending = [...trendingWeeklyData];
    html = creatTrendingHTML(trending, 'weekly');
    FS.outputFileSync(path.join(process.cwd(), 'web', 'trending-weekly.html'), html);
    console.log(`> Trending 周趋势榜，页面生成成功！共${trending.length}条数据！`);
    
    trending = [...trendingMonthlyData];
    html = creatTrendingHTML(trending, 'monthly');
    FS.outputFileSync(path.join(process.cwd(), 'web', 'trending-monthly.html'), html);
    console.log(`> Trending 月趋势榜，页面生成成功！共${trending.length}条数据！`);

  } catch (error) {
    console.log(error);
  }
})()