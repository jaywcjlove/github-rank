import { sleep, getReposData, IReposData } from './utils';
import { saveData } from './utils/saveData';

;(async() => {
  let repos: IReposData[] = [];

  let data = await getReposData(1);
  repos = repos.concat(data.items);
  console.log(`> 获取到第1页，共${data.items.length}条数据！`);
  await sleep(1000);

  data = await getReposData(2);
  repos = repos.concat(data.items);
  console.log(`> 获取到第2页，共${data.items.length}条数据！`);
  await sleep(1000);

  data = await getReposData(3);
  repos = repos.concat(data.items);
  console.log(`> 获取到第3页，共${data.items.length}条数据！`);
  await sleep(1000);

  data = await getReposData(4);
  repos = repos.concat(data.items);
  console.log(`> 获取到第3页，共${data.items.length}条数据！`);
  await sleep(1000);

  data = await getReposData(5);
  repos = repos.concat(data.items);
  console.log(`> 获取到第3页，共${data.items.length}条数据！`);

  await saveData(repos, 'repos.json');
  console.log(`> 共获取 ${repos.length} 个仓库！`);
})();