import FS from 'fs-extra';
import path from 'path';
import ejs from 'ejs';


export interface ICreateHTML {
  html_url: string;
  avatar_url: string;
  name: string | null;
  login: string;
  location: string;
  public_repos: number;
  followers: number;
  [key: string]: any;
}

export function creatHTML(userData: ICreateHTML[]): string {
  const tmpStr: string = FS.readFileSync(path.join(__dirname, 'document.ejs')).toString();
  return ejs.render(tmpStr, {
    users: userData,
    date: `${new Date().getFullYear()}/${(new Date().getMonth()) + 1}/${new Date().getDate()}`,
  });
}