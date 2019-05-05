import FS from 'fs-extra';
import path from 'path';
import { IUserData } from '../common/props';
import { sleep, getUserStarsData } from './';
import { saveUserData } from './saveUsersData';

/**
 * 用于更新用户数据，最终数据
 */
let users: IUserData[] = [];

export async function saveCacheUserStarData(data: IUserData[], type: string = '') {
  await FS.outputFile(path.join(process.cwd(), '.cache', `users${type}.star.json`), JSON.stringify(data, null, 2));
}

export async function getInfo(arr: IUserData[], type: string = '') {
  const user = arr[0];
  if (!user) {
    return;
  }
  console.log(`\n-> 获取 ${user.login} 的 Star 总数！`);
  const userStars = await getUserStarsData(user.login, user.public_repos);
  console.log('userStars:', userStars);
  users = users.map((item: IUserData) => {
    if (item.login === user.login) {
      item = { ...user };
      if (userStars) {
        item.stargazers_count = userStars;
      }
    }
    return item;
  });
  if (userStars) {
    await saveUserData(users, type);
    // 获取成功删除第一条
    arr.shift();
    await saveCacheUserStarData(arr, type);
    console.log(`<- 用户 ${user.login} 的 start 数据获取完成！还剩 ${arr.length} 个用户！`);
    await sleep(1000);
    await getInfo(arr, type);
  }
}

/**
 * 获取用户 Star 信息
 */
export async function saveStarData(usersDist: IUserData[], cacheUsers: IUserData[], type: string) {
  users = [...usersDist];
  if (cacheUsers && cacheUsers.length > 0) {
    await getInfo(cacheUsers, type);
  }
  return users;
}