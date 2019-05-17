import { getSifou, ISifou } from './utils/getSifou';
import { saveData } from './utils/saveData';

(async() => {
  let data: ISifou[] = await getSifou();
  await saveData(data, 'sifou-daily.json');
  console.log(`> 共获取思否 ${data.length} 个日热门榜数据！`);

  data = await getSifou('weekly');
  await saveData(data, 'sifou-weekly.json');
  console.log(`> 共获取思否 ${data.length} 个周热门榜数据！`);

  data = await getSifou('monthly');
  await saveData(data, 'sifou-monthly.json');
  console.log(`> 共获取思否 ${data.length} 个月热门榜数据！`);

})()