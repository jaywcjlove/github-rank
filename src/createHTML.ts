import FS from 'fs-extra';
import path from 'path';
import ejs from 'ejs';
import { IUserData } from './common/props';


export function creatHTML(userData?: IUserData[]): string {
  const tmpStr: string = FS.readFileSync(path.join(__dirname, 'document.ejs')).toString();
  return ejs.render(tmpStr, {
    users: userData,
    date: `${new Date().getFullYear()}/${(new Date().getMonth()) + 1}/${new Date().getDate()}`,
  });
}