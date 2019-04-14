import FS from 'fs-extra';
import path from 'path';
import { IUserMoreInfoUsers } from './common/props';
import { creatHTML } from './createHTML';
import usersDone from '../.cache/done.json';

(async () => {
  try {
    const html: string = creatHTML(usersDone.users);
    FS.outputFileSync(path.join(process.cwd(), 'web', 'index.html'), html);
    console.log(`-> 页面生成成功！共${usersDone.users.length}条数据！`);
  } catch (error) {
    console.log(error);
  }
})()