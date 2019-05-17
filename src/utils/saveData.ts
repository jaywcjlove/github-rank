import FS from 'fs-extra';
import path from 'path';
import { IReposData } from './';
import { ISifou } from './getSifou';

export async function saveData(data: IReposData | ISifou, filename: string) {
  await FS.outputFile(path.join(process.cwd(), 'dist', filename), JSON.stringify(data, null, 2));
}