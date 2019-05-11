import fetch from 'node-fetch';
import cheerio from 'cheerio';

export interface ISifou {
  title: string;
  description: string;
  url: string;
  author: string;
  votes: string;
  home_url: string;
  rank: number;
}

export function getSifou(type: string = '') {
  return fetch(`https://segmentfault.com/hottest/${type}`)
    .then(res => res.buffer())
    .then((data) => {
      const html = data.toString();
      const resultData: ISifou[] = [];
      const $ = cheerio.load(html);

      $('.news-list .news-item').each((idx, item) => {
        const title = $(item).find('h4').text().trim();
        const description = $(item).find('.article-excerpt').text().trim();
        const author = $(item).find('.author a').text().trim();
        const votes = $(item).find('.votes-num').text().trim();
        let homeURL = $(item).find('.author a').attr('href').trim();
        const urlElm = $(item).find('.news__item-info.clearfix a');
        const url = urlElm.first()[0].attribs.href;

        homeURL = homeURL ? `https://segmentfault.com${homeURL}` : '';
        resultData.push({ title, description, url: url ? `https://segmentfault.com${url}`: '', author, home_url: homeURL, votes, rank: idx + 1 });
      });
      return resultData;
    });
}