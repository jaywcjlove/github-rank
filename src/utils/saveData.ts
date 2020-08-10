import FS from 'fs-extra';
import path from 'path';

export async function saveData<T>(data: T, filename: string) {
  await FS.outputFile(path.join(process.cwd(), 'dist', filename), JSON.stringify(data, null, 2));
}