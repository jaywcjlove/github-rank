import { IUserData } from './common/props';
import usersCache from '../.cache/users.star.json';
import usersDist from '../dist/users.json';
import usersChinaCache from '../.cache/users.china.star.json';
import usersChinaDist from '../dist/users.china.json';
import { saveStarData } from './utils/saveStarData';

;(async () => {
  try {
    // 缓存需要获取用户 star 数的信息
    // await saveCacheUserStarData(users);
    // 缓存需要获取用户 star 数的信息
    // await saveCacheUserStarData(users, '.china');


    const userData = usersDist as IUserData[];
    // 获取【全球】用户 star 数据排行榜
    let users: IUserData[] = await saveStarData(userData, usersCache, '');
    if (usersCache.length === 0) {
      console.log(`-> 获取【全球】用户 star 数据完成！${users.length}`);
    } else {
      console.log(`<- 获取【全球】用户 star 数据未完成！还剩 ${usersCache.length} 个用户信息，待获取！`);
    }
    // // 获取【中国】用户数据排行榜
    // users = await saveUsersData(usersChinaDist, usersChinaCache, '.china');
    // if (usersCache.length === 0) {
    //   console.log(`-> 获取【全球】数据完成！${users.length}`);
    // } else {
    //   console.log(`<- 获取【全球】用户数据未完成！还剩 ${usersCache.length} 个用户信息，待获取！`);
    // }
  } catch (error) {
    console.log('UserInfoStars:', error);
  }
})();