import FS from 'fs-extra';
import path from 'path';
import { UsersData } from './common/props';
import { updateUsersData } from './utils/saveUsersData.js';

;(async () => {
  try {
    // 获取【全球】用户数据排行榜
    const users: UsersData[] = await updateUsersData('./dist/users.json', './.cache/users.json', '');
    const usersCacheDone = await FS.readJSON(path.resolve('./.cache/users.json'))
    if (usersCacheDone.length === 0) {
      console.log(`-> 获取【全球】数据完成！${users.length}`);
    } else {
      console.log(`<- 获取【全球】用户数据未完成！还剩 ${usersCacheDone.length} 个用户信息，待获取！`);
    }
    // 获取【中国】用户数据排行榜
    const usersChina: UsersData[] = await updateUsersData('./dist/users.china.json', './.cache/users.china.json', '.china', [...users]);
    const usersChinaCacheDone = await FS.readJSON(path.resolve('./.cache/users.china.json'))
    if (usersChinaCacheDone.length === 0) {
      console.log(`-> 获取【中国】数据完成！${usersChina.length}`);
    } else {
      console.log(`<- 获取【中国】用户数据未完成！还剩 ${usersChinaCacheDone.length} 个用户信息，待获取！`);
    }
  } catch (error) {
    console.log('UserInfoStars:', error);
  }
})();