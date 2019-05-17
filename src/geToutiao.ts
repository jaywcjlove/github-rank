
import { getToutiaoData } from './utils';
import { saveData } from './utils/saveData';

(async() => {
  let data = await getToutiaoData(7);
  await saveData(data, 'toutiao-7.json');
  console.log(`> 共获取开发者头条最近 7 天 ${data.length} 条数据！`);

  data = await getToutiaoData(30);
  await saveData(data, 'toutiao-30.json');
  console.log(`> 共获取开发者头条最近 30 天 ${data.length} 条数据！`);

  data = await getToutiaoData(90);
  await saveData(data, 'toutiao-90.json');
  console.log(`> 共获取开发者头条最近 90 天 ${data.length} 条数据！`);
})()