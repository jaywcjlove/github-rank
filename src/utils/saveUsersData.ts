import FS from 'fs-extra';
import path from 'path';
import { UsersDataBase, UsersData } from '../common/props.js';
import { sleep, getUserInfoData } from './index.js';

/**
 * 用于更新用户数据，最终数据
 */
let users: UsersData[] = [];

export async function saveUserData(data: UsersData[], type: string = '') {
  await FS.outputFile(path.join(process.cwd(), 'dist', `users${type}.json`), JSON.stringify(data, null, 2));
}

async function saveCacheUserData(data: UsersData[], type: string = '') {
  await FS.outputFile(path.join(process.cwd(), '.cache', `users${type}.json`), JSON.stringify(data, null, 2));
}

async function getInfo(arr: UsersDataBase[], type: string = '', globalUsers: UsersData[] = []) {
  const user: UsersDataBase = arr[0];
  if (!user) {
    return;
  }
  console.log(`\n-> 获取 ${user.login} 的更多信息！`);
  let isLocalData = true;
  let findUser: UsersData = globalUsers.find(item => item.login === user.login);
  if (!findUser) {
    isLocalData = false;
    findUser = await getUserInfoData(user.login);
    if (findUser.message && findUser.documentation_url) {
      console.log(`<- 还剩 ${arr.length} 个用户信息！error: ${findUser.message} -> ${findUser.documentation_url}`);
      return;
    } else if (!findUser.followers) {
      console.log(`<- 用户 ${user.login} 的数据获取失败，重新获取！`);
      await sleep(2000);
      await getInfo(arr, type, globalUsers);
      return;
    }
  }
  
  users.push(findUser);
  await saveUserData(users, type);
  // 获取成功删除第一条
  arr.shift();
  await saveCacheUserData(arr as unknown as UsersData[], type);
  console.log(`<- 用户 [${user.login}, followers:${findUser.followers}] 的数据获取完成！还剩 ${arr.length} 个用户信息！`);
  // console.log(`<- 用户 [${user.login}, star:${findUser._stars}, followers:${findUser.followers}] 的数据获取完成！还剩 ${arr.length} 个用户信息！`);
  if (!isLocalData) {
    await sleep(1000);
  }
  await getInfo(arr, type, globalUsers);
}

/**
 * 用户数据根据 `followers` 排序
 * @param {UsersData[]} users 用户数据
 */
function sortUser(users: UsersData[]) {
  users.sort((a: UsersData, b: UsersData) => {
    if (b.followers && a.followers) {
      return b.followers - a.followers;
    }
    return 0;
  });
  users = users.map((item: UsersData, idx: number) => {
    item.rank = idx + 1;
    return item;
  });
  return users;
}

/**
 * 更新用户信息
 * @param {UsersData[]} usersDist 原始用户数据。
 * @param {UsersDataBase[]} cacheUsers 缓存用户数据，获取到的新用户数据，用于数据请求。
 * @param {UsersData[]} globalUsers 全球用户，已完成获取数据，过滤不再请求 API 了
 * @param {String} type 类型，取值 `空` | 或者 `.china` 用于存储。
 */
export async function saveUsersData(usersDist: UsersData[], cacheUsers: UsersDataBase[], type: string, globalUsers?: UsersData[]) {
  users = Array.from(cacheUsers).map(item => {
    const userFilter = usersDist.find(data => item.login === data.login);
    return { ...userFilter, ...item };
  })
  console.log('saveUsersData:user:length', users.length)
  // 数据去重
  const obj: Record<string, boolean> = {};
  let result = [...users].reduce<UsersDataBase[]>((item, next) => {
    obj[next.login] ? '' : (obj[next.login] = true) && item.push(next);
    return item
  }, []);
  console.log('saveUsersData:result:length', result.length)

  if (result && result.length > 0) {
    await getInfo(result, type, globalUsers);
  }
  result = sortUser(result);
  result.splice(500, result.length);
  await saveUserData(result, type);
  return result;
}