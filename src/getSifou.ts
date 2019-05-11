import FS from 'fs-extra';
import path from 'path';
import { getSifou, ISifou } from './utils/getSifou';

async function saveSifouData(data: ISifou[], type: string = 'daily') {
  await FS.outputFile(path.join(process.cwd(), 'dist', `sifou-${type}.json`), JSON.stringify(data, null, 2));
}

(async() => {
  let data: ISifou[] = await getSifou();
  await saveSifouData(data);
  console.log(`> 共获取思否 ${data.length} 个日热门榜数据！`);

  data = await getSifou('weekly');
  await saveSifouData(data, 'weekly');
  console.log(`> 共获取思否 ${data.length} 个周热门榜数据！`);

  data = await getSifou('monthly');
  await saveSifouData(data, 'monthly');
  console.log(`> 共获取思否 ${data.length} 个月热门榜数据！`);

})()