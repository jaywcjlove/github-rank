Github Ranking
---

Github中国用户排名，通过 Github API v3 来生成页面数据。

WebSite: http://jaywcjlove.github.io/github-rank/

也可通过 [UNPKG](https://unpkg.com/@wcj/github-rank/web/index.html) 访问：[https://unpkg.com/@wcj/github-rank/web/index.html](https://unpkg.com/@wcj/github-rank/web/index.html)

[![](GithubRanking.png)](http://jaywcjlove.github.io/github-rank/)

### 使用

希望能从 `19年04月20日` 开始每天发版，版本号以 `年`、`月`、`日` 来定义，如: `v19.4.20`。

```bash
npm install @wcj/github-rank --save-dev
```

使用可以通过引入数据，来获取排名数据，也可以通过 [UNPKG](https://unpkg.com/@wcj/github-rank/dist/users.json) 直接访问用户数据。

```js
import users from '@wcj/github-rank';

console.log(users);
/* 输出数组
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
*/
```
