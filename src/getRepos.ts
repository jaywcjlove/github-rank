import FS from 'fs-extra';
import path from 'path';
import { sleep, getReposData, IReposData } from './utils';

async function saveReposData(data: IReposData) {
  await FS.outputFile(path.join(process.cwd(), 'dist', 'repos.json'), JSON.stringify(data, null, 2));
}

;(async() => {
  let repos: IReposData[] = [];

  let data = await getReposData(1);
  repos = repos.concat(data.items);
  console.log(`> 获取到第1页，共${data.items.length}条数据！`);
  await sleep(2000);

  data = await getReposData(2);
  repos = repos.concat(data.items);
  console.log(`> 获取到第2页，共${data.items.length}条数据！`);
  await sleep(2000);

  data = await getReposData(3);
  repos = repos.concat(data.items);
  console.log(`> 获取到第3页，共${data.items.length}条数据！`);
  await sleep(2000);

  await saveReposData(repos);
  console.log(`> 共获取 ${repos.length} 个仓库！`);
})();