import FS from 'fs-extra';
import path from 'path';
import { IResultUserData, IUserData } from './common/props';
import { getUserData, sleep } from './utils';

(async () => {
  try {
    // 记录所有数据获取完成的总数据，
    // 它是一个初始值，在重新请求用户数据列表需要，初始化记录数据
    FS.outputFileSync(path.join(process.cwd(), '.cache', 'done.json'), JSON.stringify({
      count: 0,
      errors: [],
      users: [],
    }, null, 2));

    let users: IUserData[] = [];
    let data = await getUserData(1) as IResultUserData;
    users = users.concat(data.items);
    console.log(`-> 获取到第1页，共${data.items.length}条数据！`);
    await sleep(3000);
    data = await getUserData(2) as IResultUserData;
    users = users.concat(data.items);
    console.log(`-> 获取到第2页，共${data.items.length}条数据！`);
    // await sleep(2000);
    FS.outputFileSync(path.join(process.cwd(), '.cache', 'users.json'), JSON.stringify(users, null, 2));
    console.log(`-> 共获取${users.length}条用户数据！`);
  } catch (error) {
    console.log(error);
  }
})()