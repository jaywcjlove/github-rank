import FS from 'fs-extra';
import path from 'path';
import { creatHTML, ICreateHTML } from './createHTML';
import usersDone from '../dist/users.json';

(async () => {
  try {
    const users: ICreateHTML[] = [...usersDone];
    const html: string = creatHTML(users);
    FS.outputFileSync(path.join(process.cwd(), 'web', 'index.html'), html);
    console.log(`-> 页面生成成功！共${usersDone.length}条数据！`);
  } catch (error) {
    console.log(error);
  }
})()