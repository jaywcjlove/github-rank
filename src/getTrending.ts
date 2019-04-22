import FS from 'fs-extra';
import path from 'path';
import { getTrendingData, ITrendingData } from './utils';


async function saveTrendingData(data: ITrendingData[]) {
  await FS.outputFile(path.join(process.cwd(), 'dist', 'trending.json'), JSON.stringify(data, null, 2));
}

;(async () => {
  const data: ITrendingData[] = await getTrendingData();
  await saveTrendingData(data);
  console.log(`> 共获取 ${data.length} 个趋势榜数据！`);
})();