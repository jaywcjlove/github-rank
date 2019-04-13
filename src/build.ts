import FS from 'fs-extra';
import path from 'path';
import { getUserData, sleep, IUserData, IResultUserData } from './utils';
import { creatHTML } from './createHTML'

(async () => {
  try {
    let users: IUserData[] = [];

    let data = await getUserData(1) as IResultUserData;
    users = users.concat(data.items);
    console.log(`-> 获取到第1页，共${data.items.length}条数据！`);
    await sleep(1000);

    data = await getUserData(2) as IResultUserData;
    users = users.concat(data.items);
    console.log(`-> 获取到第2页，共${data.items.length}条数据！`);
    // await sleep(2000);

    const html: string = creatHTML(users);
    FS.outputFileSync(path.join(process.cwd(), 'web', 'index.html'), html);
    console.log(`-> 页面生成成功！共${users.length}条数据！`);
  } catch (error) {
    console.log(error);
  }
})()