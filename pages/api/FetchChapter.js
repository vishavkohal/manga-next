import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  const { chapterId } = req.query;

  if (!chapterId) return res.status(400).json({ 'message': 'Missing parameters' });

  try {
    const url = 'https://ww7.mangakakalot.tv'; // Make sure you replace 'URL_HERE' with your target URL
      const response = await axios.get(`${url}/chapter/${chapterId}`);

      if (response.status === 200) {
          const html = response.data;
          const $ = cheerio.load(html);
          const title = $('.info-top-chapter h2').text().trim().replace('\n', '').replace(/\s+/g, ' ');
          const images = []; 
          $('.vung-doc img[data-src]').each((index, element) => {
              const imgSrc = $(element).attr('data-src');
              images.push(imgSrc);
          });
          const chapters = [];
          $('#c_chapter option').each((index, element) => {
              const chapterNumber = $(element).attr("value");
              chapters.push(chapterNumber);
          });
          const chapter = {
              title,
              images,
              chapters,
              'currentChapter': chapterId
          }
          res.status(200).json({ 'results': chapter });
      } else {
          res.status(response.status).json({ 'message': 'Failed to fetch data' });
      }
  } catch (error) {
      console.error(`Caught an error: ${error.message}`);
      res.status(500).json({ 'message': error.message });
  }
}
