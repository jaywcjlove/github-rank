import FS from 'fs-extra';
import path from 'path';
import { getTrendingData, ITrendingData } from './utils/index.js';


async function saveTrendingData(data: ITrendingData[], type: string = 'daily') {
  await FS.outputFile(path.join(process.cwd(), 'dist', `trending-${type}.json`), JSON.stringify(data, null, 2));
}

;(async () => {
  let data: ITrendingData[] = await getTrendingData('daily');
  await saveTrendingData(data);
  console.log(`> 共获取 \x1b[32;1m${data.length}\x1b[0m 个日趋势榜数据！`);

  data = await getTrendingData('weekly');
  await saveTrendingData(data, 'weekly');
  console.log(`> 共获取 \x1b[32;1m${data.length}\x1b[0m 个周趋势榜数据！`);

  data = await getTrendingData('monthly');
  await saveTrendingData(data, 'monthly');
  console.log(`> 共获取 \x1b[32;1m${data.length}\x1b[0m 个月趋势榜数据！`);

})();