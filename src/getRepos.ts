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
  console.log(`> 获取到第4页，共${data.items.length}条数据！`);
  await sleep(1000);

  data = await getReposData(5);
  repos = repos.concat(data.items);
  console.log(`> 获取到第5页，共${data.items.length}条数据！`);

  data = await getReposData(6);
  repos = repos.concat(data.items);
  console.log(`> 获取到第6页，共${data.items.length}条数据！`);

  data = await getReposData(7);
  repos = repos.concat(data.items);
  console.log(`> 获取到第7页，共${data.items.length}条数据！`);

  data = await getReposData(8);
  repos = repos.concat(data.items);
  console.log(`> 获取到第7页，共${data.items.length}条数据！`);

  data = await getReposData(9);
  repos = repos.concat(data.items);
  console.log(`> 获取到第7页，共${data.items.length}条数据！`);

  data = await getReposData(10);
  repos = repos.concat(data.items);
  console.log(`> 获取到第7页，共${data.items.length}条数据！`);

  await saveData(repos, 'repos.json');
  console.log(`> 共获取 ${repos.length} 个仓库！`);
})();