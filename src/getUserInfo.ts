import FS from 'fs-extra';
import path from 'path';
import { UsersDataBase, UsersData } from './common/props';
import { saveUsersData } from './utils/saveUsersData.js';

;(async () => {
  try {
    const usersDist = await FS.readJSON(path.resolve('./dist/users.json'))
    const usersCache = await FS.readJSON(path.resolve('./.cache/users.json'))
    // 获取【全球】用户数据排行榜
    const users: UsersData[] = await saveUsersData(usersDist as UsersData[], usersCache as UsersDataBase[], '');
    if (usersCache.length === 0) {
      console.log(`-> 获取【全球】数据完成！${users.length}`);
    } else {
      console.log(`<- 获取【全球】用户数据未完成！还剩 ${usersCache.length} 个用户信息，待获取！`);
    }
    const usersChinaDist = await FS.readJSON(path.resolve('./dist/users.china.json'))
    const usersChinaCache = await FS.readJSON(path.resolve('./.cache/users.china.json'))
    // 获取【中国】用户数据排行榜
    const usersChina: UsersData[] = await saveUsersData(usersChinaDist as UsersData[], usersChinaCache as UsersDataBase[], '.china', users);
    if (usersChinaCache.length === 0) {
      console.log(`-> 获取【中国】数据完成！${usersChina.length}`);
    } else {
      console.log(`<- 获取【中国】用户数据未完成！还剩 ${usersChinaCache.length} 个用户信息，待获取！`);
    }
  } catch (error) {
    console.log('UserInfoStars:', error);
  }
})();