import FS from 'fs-extra';
import path from 'path';
import { type UsersData } from './common/props.js';
import { updateUsersData } from './utils/saveUsersData.js';

;(async () => {
  try {
    // 获取【全球】用户数据排行榜
    const users: UsersData[] = await updateUsersData('./dist/users.json', './.cache/users.json', '');
    const usersCacheDone = await FS.readJSON(path.resolve('./.cache/users.json'))
    if (usersCacheDone.length === 0) {
      console.log(`-> 获取【全球】数据完成！\x1b[32;1m${users.length}\x1b[0m`);
    } else {
      console.log(`<- 获取【全球】用户数据未完成！还剩 \x1b[32;1m${usersCacheDone.length}\x1b[0m 个用户信息，待获取！`);
    }
    // 获取【中国】用户数据排行榜
    const usersChina: UsersData[] = await updateUsersData('./dist/users.china.json', './.cache/users.china.json', '.china', [...users]);
    const usersChinaCacheDone = await FS.readJSON(path.resolve('./.cache/users.china.json'))
    if (usersChinaCacheDone.length === 0) {
      console.log(`-> 获取【中国】数据完成！\x1b[32;1m${usersChina.length}\x1b[0m`);
    } else {
      console.log(`<- 获取【中国】用户数据未完成！还剩 \x1b[32;1m${usersChinaCacheDone.length}\x1b[0m 个用户信息，待获取！`);
    }
  } catch (error) {
    console.log('UserInfoStars:', error);
  }
})();