import { get36KrData, I36KrData } from './utils';
import { saveData } from './utils/saveData';


(async() => {
  let data = await get36KrData();
  if (data.length > 0) {
    const today = new Date();
    const month = today.getMonth() + 1;
    const date = `${today.getFullYear()}-${month < 10 ? `0${month}` : month}-${today.getDate()}`;
    data = data.filter((item: I36KrData) => date === item.created_at.split(' ')[0]); 
  }
  await saveData(data, '36kr.json');
  console.log(`> 共获取 36Kr 快讯 ${data.length} 条数据！`);
})()