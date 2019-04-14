import FS from 'fs-extra';
import path from 'path';
import { IUserMoreInfo, IUserData } from './common/props';
import { sleep, getUserInfoData } from './utils';
import * as usersCache from '../.cache/users.json';
import usersDone from '../.cache/done.json';

interface IUser extends IUserData {
  followers?: number;
}


const userMoreInfo: IUserMoreInfo = {
  count: 0,
  errors: [],
  users: [],
  ...usersDone,
}

function saveUserData(data: IUserMoreInfo) {
  return FS.outputFileSync(path.join(process.cwd(), '.cache', 'done.json'), JSON.stringify(data, null, 2));
}

async function getInfo(num: number) {
  const user: IUser = usersCache[num];
  if (!user) {
    console.log(`-> 获取数据完成！`);
    return;
  }
  try {
    userMoreInfo.count = num + 1;
    if (!user.followers) {
      console.log(`-> 获取第${num}条数据！`);
      const userAllInfo = await getUserInfoData(user.login);
      // Github API 被限制返回错误信息，并中断请求。
      if (userAllInfo.message && userAllInfo.documentation_url) {
        console.log(`<- error: ${userAllInfo.message} -> ${userAllInfo.documentation_url}`);
        return;
      }
      userMoreInfo.users.push({ ...user, ...userAllInfo, rank: num + 1 });
      console.log(`<- 第${num}条数据获取完成！${user.login}`);
      await saveUserData(userMoreInfo);
      await sleep(5000);
      await getInfo(num + 1);
    }
  } catch (error) {
    userMoreInfo.errors.push(num);
    await saveUserData(userMoreInfo);
    await getInfo(num + 1);
    console.log('getInfo', error);
  }
}

(async () => {
  try {
    await getInfo(userMoreInfo.count);
    if (userMoreInfo.errors.length !== 0) {
      console.log(`-> 有错误数据,检查 userMoreInfo.errors`);
    }
  } catch (error) {
    console.log(error);
  }
})()