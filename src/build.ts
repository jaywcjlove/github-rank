import FS from 'fs-extra';
import path from 'path';
import { creatFollowersHTML, creatReposHTML, creatTrendingHTML, creatSifouHTML, creatToutiaoHTML, ICreateFollowersHTML, IReposHTML, ICreateTrendingHTML } from './createHTML';
import { ISifou } from './utils/getSifou';
import usersDone from '../dist/users.json';
import usersChinaDone from '../dist/users.china.json';
import reposData from '../dist/repos.json';
import trendingDailyData from '../dist/trending-daily.json';
import trendingWeeklyData from '../dist/trending-weekly.json';
import trendingMonthlyData from '../dist/trending-monthly.json';
import sifouDailyData from '../dist/sifou-daily.json';
import sifouWeeklyData from '../dist/sifou-weekly.json';
import sifouMonthlyData from '../dist/sifou-monthly.json';

import { IToutiaoData } from './utils';
import toutiao7 from '../dist/toutiao-7.json';
import toutiao30 from '../dist/toutiao-30.json';
import toutiao90 from '../dist/toutiao-90.json';

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

    console.log(`> ------------------`)

    const repos: IReposHTML[] = [...reposData];
    html = creatReposHTML(repos);
    FS.outputFileSync(path.join(process.cwd(), 'web', 'repos.html'), html);
    console.log(`> Repos 排行榜，页面生成成功！共${repos.length}条数据！`);

    console.log(`> ------------------`)

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

    console.log(`> ------------------`)

    let sifou: ISifou[] = [...sifouDailyData];
    html = creatSifouHTML(sifou, 'daily');
    FS.outputFileSync(path.join(process.cwd(), 'web', 'sifou-daily.html'), html);
    console.log(`> 思否 日趋势榜，页面生成成功！共${sifou.length}条数据！`);

    sifou = [...sifouWeeklyData];
    html = creatSifouHTML(sifou, 'weekly');
    FS.outputFileSync(path.join(process.cwd(), 'web', 'sifou-weekly.html'), html);
    console.log(`> 思否 周趋势榜，页面生成成功！共${sifou.length}条数据！`);

    sifou = [...sifouMonthlyData];
    html = creatSifouHTML(sifou, 'monthly');
    FS.outputFileSync(path.join(process.cwd(), 'web', 'sifou-monthly.html'), html);
    console.log(`> 思否 月趋势榜，页面生成成功！共${sifou.length}条数据！`);

    console.log(`> ------------------`)

    let toutiao: IToutiaoData[] = [...toutiao7];
    html = creatToutiaoHTML(toutiao, 7);
    FS.outputFileSync(path.join(process.cwd(), 'web', 'toutiao-7.html'), html);
    console.log(`> 头条 7 趋势榜，页面生成成功！共${sifou.length}条数据！`);

    toutiao = [...toutiao30];
    html = creatToutiaoHTML(toutiao, 30);
    FS.outputFileSync(path.join(process.cwd(), 'web', 'toutiao-30.html'), html);
    console.log(`> 头条 30 趋势榜，页面生成成功！共${sifou.length}条数据！`);

    toutiao = [...toutiao90];
    html = creatToutiaoHTML(toutiao, 90);
    FS.outputFileSync(path.join(process.cwd(), 'web', 'toutiao-90.html'), html);
    console.log(`> 头条 90 趋势榜，页面生成成功！共${sifou.length}条数据！`);

  } catch (error) {
    console.log(error);
  }
})()