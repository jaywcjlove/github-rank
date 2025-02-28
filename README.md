[[中文](./README-zh.md)] Preview: [Github](http://jaywcjlove.github.io/github-rank/) | [Gitee](http://jaywcjlove.gitee.io/github-rank) | [UNPKG](https://unpkg.com/@wcj/github-rank/web/index.html) | [Githack](https://raw.githack.com/jaywcjlove/github-rank/gh-pages/index.html) | [Statically](https://cdn.statically.io/gh/jaywcjlove/github-rank/gh-pages/index.html) | [Netlify](https://githubrank.netlify.app/)

<p align="center">
  <a href="https://jaywcjlove.github.io/github-rank">
    <img alt="Github Ranking" src="https://user-images.githubusercontent.com/1680273/204141518-e34799bd-9074-4bf9-9b4e-f3efe6d8051e.png">
  </a>
</p>

<p align="center">
  <a href="https://jaywcjlove.github.io/#/sponsor"><img alt="Buy me a coffee" src="https://img.shields.io/badge/Buy%20me%20a%20coffee-048754?logo=buymeacoffee"></a>
  <a href="https://github.com/jaywcjlove/github-rank/actions/workflows/ci3.yml"><img src="https://github.com/jaywcjlove/github-rank/actions/workflows/ci3.yml/badge.svg"></a>
  <a href="https://github.com/jaywcjlove/github-rank/issues"><img src="https://badgen.net/github/issues/jaywcjlove/github-rank"></a>
  <a href="https://github.com/jaywcjlove/github-rank/forks"><img src="https://badgen.net/github/forks/jaywcjlove/github-rank"></a>
  <a href="https://github.com/jaywcjlove/github-rank/stargazers"><img src="https://badgen.net/github/stars/jaywcjlove/github-rank"></a>
  <a href="https://www.npmjs.com/package/@wcj/github-rank"><img src="https://img.shields.io/npm/v/@wcj/github-rank.svg"></a>
</p>

Github global/Chinese user rankings, global repositories Star rankings, page data generated through Github API v3, [ranking preview](http://jaywcjlove.github.io/github-rank/).

- [Github **Global** User Followers Ranking Preview](http://jaywcjlove.github.io/github-rank/)
- [Github **China** User Followers Ranking Preview](http://jaywcjlove.github.io/github-rank/users.china.html)
- [Github **Global** Org User Followers Ranking Preview](http://jaywcjlove.github.io/github-rank/org.html)
- [Github Global repositories Star Most Ranking Preview](http://jaywcjlove.github.io/github-rank/repos.html)
- [Github community trend list daily, weekly, monthly preview](http://jaywcjlove.github.io/github-rank/trending.html) [**`daily`**](http://jaywcjlove.github.io/github-rank/trending.html) [**`weekly`**](http://jaywcjlove.github.io/github-rank/trending-weekly.html) [**`monthly`**](http://jaywcjlove.github.io/github-rank/trending-monthly.html)

Released on [`npm`](https://www.npmjs.com/package/@wcj/github-rank) from `April 20, 2019,` the version number is defined by `year`, `month`, and `day`, such as: `v19.4.20`.

Now it can be updated automatically every day, using [GitHub Actions Workflows](https://github.com/actions/starter-workflows) to trigger the GitHub workflow every day at 00:00 (8:00 am Beijing time) through the timer, automatically crawl the data, submit the generated web page to the gh-pages branch, and Automatically publish [npm](https://www.npmjs.com/package/@wcj/github-rank) version, really fragrant! !

Update date: <!--GAMFC-->2025-02-28 18:00:50<!--GAMFC-END-->

## Plug-in Usage

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

## Development

```bash
$ git clone https://github.com/jaywcjlove/github-rank.git
$ cd github-rank
$ npm install   # Install dependencies
$ npm run build # Compilation output script
```

Crawlers get data

```bash
$ npm run get:trending    # Get trending data
$ npm run get:repos       # Get repos data
$ npm run get:users       # Get users data
$ npm run get:users:china # Get users(china) data
```

Generate HTML page

```bash
$ npm run start
```

## Contributors

As always, thanks to our amazing contributors!

<!--AUTO_GENERATED_PLEASE_DONT_DELETE_IT--><a href="https://github.com/jaywcjlove" title="小弟调调"><img src="https://avatars.githubusercontent.com/u/1680273?v=4" width="42;" alt="小弟调调"/></a>
<a href="https://github.com/renovate-bot" title="Mend Renovate"><img src="https://avatars.githubusercontent.com/u/25180681?v=4" width="42;" alt="Mend Renovate"/></a>
<a href="https://github.com/leon-kfd" title="Leon-kfd"><img src="https://avatars.githubusercontent.com/u/30256102?v=4" width="42;" alt="Leon-kfd"/></a>
<a href="https://github.com/ryanuo" title="Ryan uo"><img src="https://avatars.githubusercontent.com/u/66169324?v=4" width="42;" alt="Ryan uo"/></a>
<a href="https://github.com/372798735" title="mindsets"><img src="https://avatars.githubusercontent.com/u/52733319?v=4" width="42;" alt="mindsets"/></a>
<a href="https://github.com/antfu" title="Anthony Fu"><img src="https://avatars.githubusercontent.com/u/11247099?v=4" width="42;" alt="Anthony Fu"/></a>
<a href="https://github.com/FeeiCN" title="Feei"><img src="https://avatars.githubusercontent.com/u/1611552?v=4" width="42;" alt="Feei"/></a>
<a href="https://github.com/zhenyong" title="ZY"><img src="https://avatars.githubusercontent.com/u/4012276?v=4" width="42;" alt="ZY"/></a><!--AUTO_GENERATED_PLEASE_DONT_DELETE_IT-END-->

Made with [contributors](https://github.com/jaywcjlove/github-action-contributors), automatically generated.

## License

Licensed under the MIT License.

