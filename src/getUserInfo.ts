import FS from 'fs-extra';
import path from 'path';
import { IUserData } from './common/props';
import { sleep, getUserInfoData } from './utils';
import usersCache from '../.cache/users.json';
import usersDist from '../dist/users.json';

async function saveUserData(data: IUserData[]) {
  await FS.outputFile(path.join(process.cwd(), 'dist', 'users.json'), JSON.stringify(data, null, 2));
}

async function saveCacheUserData(data: IUserData[]) {
  await FS.outputFile(path.join(process.cwd(), '.cache', 'users.json'), JSON.stringify(data, null, 2));
}

let cacheUsers: IUserData[] = [...usersCache];
let users: IUserData[] = [...usersDist];

async function getInfo(arr: IUserData[]) {
  const user = arr[0];
  if (!user) {
    return;
  }
  console.log(`\n-> 获取 ${user.login} 的更多信息！`);
  const userAllInfo = await getUserInfoData(user.login);
  // Github API 被限制返回错误信息，并中断请求。
  if (userAllInfo.message && userAllInfo.documentation_url) {
    console.log(`<- 还剩 ${arr.length} 个用户信息！error: ${userAllInfo.message} -> ${userAllInfo.documentation_url}`);
    return;
  } else if (!userAllInfo.followers) {
    console.log(`<- 用户 ${user.login} 的数据获取失败，重新获取！`);
    await sleep(2000);
    await getInfo(arr);
  } else {
    const userFilter = usersDist.find(item => item.login === userAllInfo.login);
    if (!userFilter) {
      users.push(userAllInfo);
    } else {
      users = users.map((item: IUserData) => {
        if (item.login === userAllInfo.login) {
          item = { ...user, ...userAllInfo };
        }
        return item;
      });
    }
    await saveUserData(users);
    // 获取成功删除第一条
    arr.shift();
    await saveCacheUserData(arr);
    console.log(`<- 用户 ${user.login} 的数据获取完成！还剩 ${arr.length} 个用户信息！`);
    await sleep(1000);
    await getInfo(arr);
  }
}

;(async () => {
  try {
    await getInfo(cacheUsers);
    if (cacheUsers.length === 0) {
      users.sort((a, b) => {
        if (b.followers && a.followers) {
          return b.followers - a.followers;
        } 
        return 0;
      });
      users = users.map((item, idx) => {
        item.rank = idx + 1;
        return item;
      });
      await saveUserData(users);
      console.log(`-> 获取数据完成！${users.length}`);
    } else {
      console.log(`<- 用户数据获取未完成！还剩 ${usersCache.length} 个用户信息，待获取！`);
    }
  } catch (error) {
    console.log('UserInfo:', error);
  }
})();