import FS from 'fs-extra';
import path from 'path';
import { type UsersData } from './common/props.js';
import { updateUsersData } from './utils/saveUsersData.js';

; (async () => {
  try {
    // 获取【全球】用户数据排行榜
    const users: UsersData[] = await updateUsersData('./dist/users.json', './.cache/users.json', '');
    const usersCacheDone = await FS.readJSON(path.resolve('./.cache/users.json'))
    if (usersCacheDone.length === 0) {
      console.log(`-> 获取【全球】数据完成！\x1b[32;1m${users.length}\x1b[0m`);
      let result = users.filter(item => item.type === 'User')
      await FS.writeJSON(path.resolve('./dist/users.json'), result, { spaces: 2 });

      console.log(`   获取【全球用户】数据： \x1b[32;1m${result.length}\x1b[0m 条数据`);
      let resultOrg = users.filter(item => item.type === 'Organization')
      await FS.writeJSON(path.resolve('./dist/users.org.json'), resultOrg, { spaces: 2 });
      console.log(`   获取【全球 Organization】数据： \x1b[32;1m${resultOrg.length}\x1b[0m 条数据`);
    } else {
      console.log(`<- 获取【全球】用户数据未完成！还剩 \x1b[32;1m${usersCacheDone.length}\x1b[0m 个用户信息，待获取！`);
    }
    // 获取【中国】用户数据排行榜
    const usersChina: UsersData[] = await updateUsersData('./dist/users.china.json', './.cache/users.china.json', '.china', [...users]);
    const usersChinaCacheDone = await FS.readJSON(path.resolve('./.cache/users.china.json'))
    if (usersChinaCacheDone.length === 0) {
      console.log(`-> 获取【中国】数据完成！\x1b[32;1m${usersChina.length}\x1b[0m`);

      let result = usersChina.filter(item => item.type === 'User')
      await FS.writeJSON(path.resolve('./dist/users.china.json'), result, { spaces: 2 });
      console.log(`   获取【中国用户】数据： \x1b[32;1m${result.length}\x1b[0m 条数据`);
    } else {
      console.log(`<- 获取【中国】用户数据未完成！还剩 \x1b[32;1m${usersChinaCacheDone.length}\x1b[0m 个用户信息，待获取！`);
    }
  } catch (error) {
    console.log('UserInfoStars:', error);
  }
})();