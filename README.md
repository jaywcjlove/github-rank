[[中文](./README-zh.md)] Preview: [Github](http://jaywcjlove.github.io/github-rank/) | [Gitee](http://jaywcjlove.gitee.io/github-rank) | [UNPKG](https://unpkg.com/@wcj/github-rank/web/index.html) | [Githack](https://raw.githack.com/jaywcjlove/github-rank/gh-pages/index.html) | [Statically](https://cdn.statically.io/gh/jaywcjlove/github-rank/gh-pages/index.html)

<p align="center">
  <a href="https://jaywcjlove.github.io/github-rank">
    <img alt="Github Ranking" src="https://user-images.githubusercontent.com/1680273/65843701-9efb9280-e365-11e9-80c7-0ed5def853de.png">
  </a>
</p>

<p align="center">
  <a href="https://github.com/jaywcjlove/github-rank">
    <img src="https://github.com/jaywcjlove/github-rank/workflows/Build%20and%20Deploy%20Github%20Rank/badge.svg">
  </a>
  <a href="https://github.com/jaywcjlove/github-rank/issues">
    <img src="https://img.shields.io/github/issues/jaywcjlove/github-rank.svg">
  </a>
  <a href="https://github.com/jaywcjlove/github-rank/network">
    <img src="https://img.shields.io/github/forks/jaywcjlove/github-rank.svg">
  </a>
  <a href="https://github.com/jaywcjlove/github-rank/stargazers">
    <img src="https://img.shields.io/github/stars/jaywcjlove/github-rank.svg">
  </a>
  <a href="https://www.npmjs.com/package/@wcj/github-rank">
    <img src="https://img.shields.io/npm/v/@wcj/github-rank.svg">
  </a>
</p>

Github global/Chinese user rankings, global repositories Star rankings, page data generated through Github API v3, [ranking preview](http://jaywcjlove.github.io/github-rank/).

- [Github **Global** User Followers Ranking Preview](http://jaywcjlove.github.io/github-rank/)
- [Github **China** User Followers Ranking Preview](http://jaywcjlove.github.io/github-rank/users.china.html)
- [Github Global repositories Star Most Ranking Preview](http://jaywcjlove.github.io/github-rank/repos.html)
- [Github community trend list daily, weekly, monthly preview](http://jaywcjlove.github.io/github-rank/trending.html) [**`daily`**](http://jaywcjlove.github.io/github-rank/trending.html) [**`weekly`**](http://jaywcjlove.github.io/github-rank/trending-weekly.html) [**`monthly`**](http://jaywcjlove.github.io/github-rank/trending-monthly.html)

Released on [`npm`](https://www.npmjs.com/package/@wcj/github-rank) from `April 20, 2019,` the version number is defined by `year`, `month`, and `day`, such as: `v19.4.20`.

Now it can be updated automatically every day, using [GitHub Actions Workflows](https://github.com/actions/starter-workflows) to trigger the GitHub workflow every day at 00:00 (8:00 am Beijing time) through the timer, automatically crawl the data, submit the generated web page to the gh-pages branch, and Automatically publish [npm](https://www.npmjs.com/package/@wcj/github-rank) version, really fragrant! !

Update date: <!--GAMFC-->2022-11-12 06:01:38<!--GAMFC-END-->

## Usage

```bash
npm install @wcj/github-rank --save-dev
```

Users can obtain ranking data by importing data, or directly access the [user leaderboard](https://unpkg.com/@wcj/github-rank/web/index.html) through [UNPKG](https://unpkg.com/@wcj/github-rank/dist/users.json).

```js
import users from '@wcj/github-rank';
import repos from '@wcj/github-rank/dist/repos.json';
import trendingDaily from '@wcj/github-rank/dist/trending-daily.json';
import trendingWeekly from '@wcj/github-rank/dist/trending-weekly.json';
import trendingMonthly from '@wcj/github-rank/dist/trending-monthly.json';
```

```js
import users from '@wcj/github-rank';

// By default users outputs the following data:
[
  {
    "login": "jaywcjlove",
    "id": 1680273,
    "node_id": "MDQ6VXNlcjE2ODAyNzM=",
    "avatar_url": "https://avatars1.githubusercontent.com/u/1680273?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/jaywcjlove",
    "html_url": "https://github.com/jaywcjlove",
    "followers_url": "https://api.github.com/users/jaywcjlove/followers",
    "following_url": "https://api.github.com/users/jaywcjlove/following{/other_user}",
    "gists_url": "https://api.github.com/users/jaywcjlove/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/jaywcjlove/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/jaywcjlove/subscriptions",
    "organizations_url": "https://api.github.com/users/jaywcjlove/orgs",
    "repos_url": "https://api.github.com/users/jaywcjlove/repos",
    "events_url": "https://api.github.com/users/jaywcjlove/events{/privacy}",
    "received_events_url": "https://api.github.com/users/jaywcjlove/received_events",
    "type": "User",
    "site_admin": false,
    "score": 1,
    "rank": 117,
    "name": "小弟调调™",
    "company": "ʕ•̫͡•ʔ-̫͡-ʕ•͓͡•ʔ-̫͡-ʔ",
    "blog": "http://wangchujiang.com",
    "location": "Shanghai, China",
    "email": "wowohoo@qq.com",
    "hireable": true,
    "bio": "(͡·̮̃·̃) 撸码的乐趣 💯 ，“人没了，™代码还在”",
    "public_repos": 78,
    "public_gists": 1,
    "followers": 2519,
    "following": 91,
    "created_at": "2012-04-26T00:30:25Z",
    "updated_at": "2019-04-12T14:27:54Z"
  }
]
```

## Crawlers get data

```bash
# Get Github (China/Global) user rankings (Top 900)
npm run get

# Github user acquisition fails in the middle, and then the remaining user information is acquired
npm run get:users:info

# Get Github trend list, Github repository ranking (Top 500) data
npm run get:o
```

## License

Licensed under the MIT License.

