import { IUserData } from './common/props';
import usersCache from '../.cache/users.json';
import usersDist from '../dist/users.json';
import usersChinaCache from '../.cache/users.china.json';
import usersChinaDist from '../dist/users.china.json';
import { saveUsersData } from './utils/saveUsersData';
import { saveCacheUserStarData } from './utils/saveStarData';

;(async () => {
  try {
    // 获取【全球】用户数据排行榜
    let users: IUserData[] = await saveUsersData(usersDist, usersCache, '');
    if (usersCache.length === 0) {
      console.log(`-> 获取【全球】数据完成！${users.length}`);
    } else {
      console.log(`<- 获取【全球】用户数据未完成！还剩 ${usersCache.length} 个用户信息，待获取！`);
    }
    // 获取【中国】用户数据排行榜
    users = await saveUsersData(usersChinaDist, usersChinaCache, '.china');
    if (usersCache.length === 0) {
      console.log(`-> 获取【全球】数据完成！${users.length}`);
    } else {
      console.log(`<- 获取【全球】用户数据未完成！还剩 ${usersCache.length} 个用户信息，待获取！`);
    }
  } catch (error) {
    console.log('UserInfoStars:', error);
  }
})();