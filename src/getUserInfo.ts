import FS from 'fs-extra';
import path from 'path';
import { IUserMoreInfo, IUserData, IGithubUserInfoData } from './common/props';
import { sleep, getUserInfoData } from './utils';
import usersCache from '../.cache/users.json';
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
      } else {
        userMoreInfo.users.push({ ...user, ...userAllInfo });
        console.log(`<- 第${num}条数据获取完成！${user.login}`);
        await saveUserData(userMoreInfo);
      }
      await sleep(5000);
      await getInfo(num + 1);
    }
  } catch (error) {
    await saveUserData(userMoreInfo);
    await getInfo(num + 1);
    console.log('getInfo', error);
  }
}

async function getNotExistUserInfo(num: number, arr: IUserData[]) {
  if (!arr[num]) return;
  const user: IUser = arr[num];
  if (!user) return;
  try {
    const userAllInfo: IGithubUserInfoData = await getUserInfoData(user.login);
    // Github API 被限制返回错误信息，并中断请求。
    if (userAllInfo.message && userAllInfo.documentation_url) {
      console.log(`<- error: ${userAllInfo.message} -> ${userAllInfo.documentation_url}`, userAllInfo);
      return;
    }
    console.log(`<- 用户 ${user.login} 数据获取完成！`);
    userMoreInfo.users.push({ ...user, ...userAllInfo });
    userMoreInfo.errors = [...userMoreInfo.errors].splice(1);
    await saveUserData(userMoreInfo);
    if (userMoreInfo.errors.length === 0) return;
    await sleep(2000);
    await getNotExistUserInfo(0, userMoreInfo.errors);
  } catch (error) {
    console.log('getNotExistUserInfo', error);
  }
}

(async () => {
  try {
    await getInfo(userMoreInfo.count);
    // Filter not exist users.
    const notExistUser: IUserData[] = [];   
    usersCache.filter((item: IUserData) => {
      const filterData = usersDone.users.find((d: IUserData) => d.login === item.login);
      if (!filterData) {
        notExistUser.push(item);
      }
    });
    userMoreInfo.errors = notExistUser;
    await saveUserData(userMoreInfo);
    await getNotExistUserInfo(0, userMoreInfo.errors);
    console.log(`-> 获取数据完成！缓存 ${usersCache.length} 条用户信息，共获取 ${userMoreInfo.users.length} 条用户数据！`);
    userMoreInfo.users = userMoreInfo.users.sort((a, b) => a.rank - b.rank);
    await saveUserData(userMoreInfo);
  } catch (error) {
    console.log(error);
  }
})()