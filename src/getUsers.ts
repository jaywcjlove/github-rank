import FS from 'fs-extra';
import path from 'path';
import { getUserData, sleep } from './utils/index.js';
import { UsersDataBase } from './common/props.js';

function uniqueAndRank(users: UsersDataBase[]) {
  const obj: Record<string, boolean> = {};
  const result = users.reduce<UsersDataBase[]>((item, next) => {
    obj[next.login] ? '' : (obj[next.login] = true) && item.push(next);
    return item;
  }, []);

  return result.map((item: UsersDataBase, idx: number) => {
    item.rank = idx + 1;
    return item;
  });
}

(async () => {
  try {
    let users: UsersDataBase[] = [];
    for (let page = 1; page <= 8; page += 1) {
      const data = await getUserData(page);
      users = users.concat(data);
      console.log(`-> 获取到第${page}页，共\x1b[32;1m${data.length}\x1b[0m条数据！`);

      const result = uniqueAndRank(users);
      FS.outputFileSync(path.join(process.cwd(), '.cache', 'users.json'), JSON.stringify(result, null, 2));

      if (data.length === 0) {
        console.log(`-> 第${page}页为空，提前停止抓取。`);
        break;
      }
      await sleep(1000);
    }

    const result = uniqueAndRank(users);

    FS.outputFileSync(path.join(process.cwd(), '.cache', 'users.json'), JSON.stringify(result, null, 2));
    console.log(`-> 共获取\x1b[32;1m${result.length}\x1b[0m条用户数据！`);
  } catch (error) {
    console.log(error);
  }
})()
