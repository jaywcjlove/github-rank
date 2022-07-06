import FS from 'fs-extra';
import path from 'path';
import { getUserData, sleep } from './utils/index.js';
import { UsersDataBase } from './common/props.js';

(async () => {
  try {
    let users: UsersDataBase[] = [];
    let data = await getUserData(1);
    users = users.concat(data);
    console.log(`-> 获取到第1页，共${data.length}条数据！`);
    await sleep(1000);

    data = await getUserData(2);
    users = users.concat(data);
    console.log(`-> 获取到第2页，共${data.length}条数据！`);
    await sleep(1000);

    data = await getUserData(3);
    users = users.concat(data);
    console.log(`-> 获取到第3页，共${data.length}条数据！`);
    await sleep(1000);

    data = await getUserData(4);
    users = users.concat(data);
    console.log(`-> 获取到第3页，共${data.length}条数据！`);
    await sleep(1000);

    data = await getUserData(5);
    users = users.concat(data);
    console.log(`-> 获取到第3页，共${data.length}条数据！`);

    users = users.map((item: UsersDataBase, idx: number) => {
      item.rank = idx + 1;
      return item;
    }).slice(0, 500);

    FS.outputFileSync(path.join(process.cwd(), '.cache', 'users.json'), JSON.stringify(users, null, 2));
    console.log(`-> 共获取${users.length}条用户数据！`);
  } catch (error) {
    console.log(error);
  }
})()