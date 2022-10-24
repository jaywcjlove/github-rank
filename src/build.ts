import FS from 'fs-extra';
import path from 'path';
import {
  creatFollowersHTML,
  creatReposHTML,
  creatTrendingHTML,
  ICreateFollowersHTML, IReposHTML, ICreateTrendingHTML } from './createHTML.js';
import usersDone from '../dist/users.json' assert { type: "json" };
import usersChinaDone from '../dist/users.china.json' assert { type: "json" };
import usersRIP from '../dist/users.rip.json' assert { type: "json" };
import reposData from '../dist/repos.json' assert { type: "json" };
import trendingDailyData from '../dist/trending-daily.json' assert { type: "json" };
import trendingWeeklyData from '../dist/trending-weekly.json' assert { type: "json" };
import trendingMonthlyData from '../dist/trending-monthly.json' assert { type: "json" };

function markDeath(data: ICreateFollowersHTML[] = []) {
  return data.map(item => {
    const findUser = usersRIP.find(e => e.username === item.login);
    if (findUser) {
      item['death'] = findUser.date;
    }
    return item;
  });
}

(async () => {
  try {
    let users: ICreateFollowersHTML[] = [...usersDone];

    users = markDeath(users);
    
    let html: string = creatFollowersHTML(users, 'global');
    FS.outputFileSync(path.join(process.cwd(), 'web', 'index.html'), html);
    console.log(`> 全球用户 Follower 排行榜，页面生成成功！共${users.length}条数据！`);

    users = [...usersChinaDone];
    users = markDeath(users);
    
    html = creatFollowersHTML(users, 'china');
    FS.outputFileSync(path.join(process.cwd(), 'web', 'users.china.html'), html);
    console.log(`> 中国用户 Follower 排行榜，页面生成成功！共${users.length}条数据！`);

    console.log(`> ------------------`)

    const repos: IReposHTML[] = [...(reposData as any)];
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

  } catch (error) {
    console.log(error);
  }
})()