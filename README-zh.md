[[English](./README.md)] Preview: [Github](http://jaywcjlove.github.io/github-rank/) | [Gitee](http://jaywcjlove.gitee.io/github-rank) | [UNPKG](https://unpkg.com/@wcj/github-rank/web/index.html) | [Githack](https://raw.githack.com/jaywcjlove/github-rank/gh-pages/index.html) | [Statically](https://cdn.statically.io/gh/jaywcjlove/github-rank/gh-pages/index.html) | [Netlify](https://githubrank.netlify.app/)

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

Github 全球/中国用户排名，全球仓库 Star 最多排名，通过 Github API v3 来生成页面数据，[排行榜预览](http://jaywcjlove.github.io/github-rank/)。

- [Github **全球** 用户 Followers 排名预览](http://jaywcjlove.github.io/github-rank/)
- [Github **中国** 用户 Followers 排名预览](http://jaywcjlove.github.io/github-rank/users.china.html)
- [Github **全球** 组织用户 Followers 排名预览](http://jaywcjlove.github.io/github-rank/org.html)
- [Github 全球仓库 Star 最多排名预览](http://jaywcjlove.github.io/github-rank/repos.html)
- [Github 社区趋势榜日、周、月预览](http://jaywcjlove.github.io/github-rank/trending.html) [**`日`**](http://jaywcjlove.github.io/github-rank/trending.html) [**`周`**](http://jaywcjlove.github.io/github-rank/trending-weekly.html) [**`月`**](http://jaywcjlove.github.io/github-rank/trending-monthly.html)

从 `2019年04月20日` 在 [`npm`](https://www.npmjs.com/package/@wcj/github-rank) 上发版，版本号以 `年`、`月`、`日` 来定义，如: `v19.4.20`。

现在每天可以自动更新了，利用 [GitHub Actions Workflows](https://github.com/actions/starter-workflows) 通过定时器，每天 `00:00` (北京时间早上8:00) 触发 GitHub 的工作流，自动爬数据，将生成的 web 页面提交到 `gh-pages` 分支，并且自动发布 [npm](https://www.npmjs.com/package/@wcj/github-rank) 版本，真香！！

更新时间：<!--GAMFC-->2022-11-05 09:15:32<!--GAMFC-END-->

## 插件使用

```bash
npm install @wcj/github-rank --save-dev
```

使用可以通过引入数据，来获取排名数据，也可以通过 [UNPKG](https://unpkg.com/@wcj/github-rank/dist/users.json) 直接访问[用户排行榜](https://unpkg.com/@wcj/github-rank/web/index.html)。

```js
import users from '@wcj/github-rank';
import repos from '@wcj/github-rank/dist/repos.json';
import trendingDaily from '@wcj/github-rank/dist/trending-daily.json';
import trendingWeekly from '@wcj/github-rank/dist/trending-weekly.json';
import trendingMonthly from '@wcj/github-rank/dist/trending-monthly.json';
```

```js
import users from '@wcj/github-rank';

// 默认 users 输出如下数据：
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

## 开发

```bash
$ git clone https://github.com/jaywcjlove/github-rank.git
$ cd github-rank
$ npm install   # 安装依赖
$ npm run build # 编译输出脚本
```

获取数据

```bash
$ npm run get:trending    # 获取 trending 数据
$ npm run get:repos       # 获取 repos 数据
$ npm run get:users       # 获取 users 数据
$ npm run get:users:china # 获取 users(china) 数据
```

生成 HTML 页面

```bash
$ npm run start
```

## 感谢所有贡献者

一如既往，感谢我们出色的贡献者！

<!--AUTO_GENERATED_PLEASE_DONT_DELETE_IT--><!--AUTO_GENERATED_PLEASE_DONT_DELETE_IT-END-->

贡献者列表，由 [contributors](https://github.com/jaywcjlove/github-action-contributors) 自动生成

## License

Licensed under the MIT License.

