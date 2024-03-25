// pages/api/chapterInfo.js

import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  const { query: { chapterId } } = req; // Assuming the query parameter is named 'id'

  if (!chapterId) {
    return res.status(400).json({ 'message': 'Missing Query ID' });
  }

  // Replacing with a hypothetical URL, ensure this matches the actual site you're working with.
  const url = 'https://ww7.mangakakalot.tv';

  try {
    const response = await axios.get(`${url}/manga/${chapterId}`);

    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);
      const img = $('.manga-info-top .manga-info-pic img').attr('src');
      const title = $('.manga-info-top .manga-info-text li:eq(0) h1').text().trim();
      const alternative = $('.manga-info-top .manga-info-text li:eq(0) h2').text().split(';').map(alternative => alternative.trim());
      const authors = $('.manga-info-top .manga-info-text li:contains("Author(s)")').find('a').map((index, element) => $(element).text().trim()).get();
      const status = $('.manga-info-top .manga-info-text li:eq(2)').text().replace('Status : ', '').trim();
      const lastUpdate = $('.manga-info-top .manga-info-text li:eq(3)').text().replace('Last updated : ', '').trim();
      const view =  $('.manga-info-top .manga-info-text li:eq(5)').text().replace('View : ', '').trim();
      const genres = $('.manga-info-top .manga-info-text li:contains("Genres")').find('a').map((index, element) => $(element).text().trim()).get();
      const averageRate = $('.manga-info-top .manga-info-text li:eq(8) em[property="v:average"]').text().trim();
      const bestRate = $('.manga-info-top .manga-info-text li:eq(8) em[property="v:best"]').text().trim();
      const votes = $('.manga-info-top .manga-info-text li:eq(8) em[property="v:votes"]').text().trim();
      const summary = $('#noidungm').contents().last().text().trim(); 
      const chapters = [];

      $('.chapter .manga-info-chapter .chapter-list .row').each((index, element) => {
        const chapterName = $(element).find('a').text().trim();
        const chapterID = $(element).find('a').attr('href').replace('/chapter/', '');
        const views = $(element).find('span:nth-child(2)').text().trim();
        const timeUploaded = $(element).find('span:nth-child(3)').text().trim();
        chapters.push({
          chapterName,
          chapterID,
          views,
          timeUploaded
        });
      });

      const results = {
        img: `${url}${img}`,
        title,
        alternative,
        authors,
        status,
        lastUpdate,
        view,
        genres,
        rate: `${averageRate}/${bestRate}`,
        votes,
        summary,
        chapters
      };

      return res.status(200).json(results);
    } else {
      return res.status(response.status).json({ 'message': 'Failed to fetch manga information' });
    }
  } catch (error) {
    console.error(`Caught an error: ${error.message}`);
    return res.status(500).json({ 'message': `Error fetching manga information: ${error.message}` });
  }
}
