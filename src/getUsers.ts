import FS from 'fs-extra';
import path from 'path';
import { IResultUserData, IUserData } from './common/props';
import { getUserData, sleep } from './utils';

(async () => {
  try {
    let users: IUserData[] = [];
    let data = await getUserData(1) as IResultUserData;
    users = users.concat(data.items);
    console.log(`-> 获取到第1页，共${data.items.length}条数据！`);
    await sleep(2000);

    data = await getUserData(2) as IResultUserData;
    users = users.concat(data.items);
    console.log(`-> 获取到第2页，共${data.items.length}条数据！`);
    await sleep(2000);

    data = await getUserData(3) as IResultUserData;
    users = users.concat(data.items);
    console.log(`-> 获取到第2页，共${data.items.length}条数据！`);

    // await sleep(2000);
    users = users.map((item: IUserData, idx: number) => {
      item.rank = idx + 1;
      return item;
    });

    FS.outputFileSync(path.join(process.cwd(), '.cache', 'users.json'), JSON.stringify(users, null, 2));
    console.log(`-> 共获取${users.length}条用户数据！`);
  } catch (error) {
    console.log(error);
  }
})()