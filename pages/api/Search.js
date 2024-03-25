import axios from 'axios';
import cheerio from 'cheerio';
const urldata = require('url');

const url = 'https://ww7.mangakakalot.tv';

// Assuming 'url' is a module you're referring to for parsing URLs

export default async function handler(req, res) {
  const { query: { query, page = 1 } } = req; // Destructure query and page from query parameters

  if (!query) {
    res.status(400).json({ message: 'Missing Query' });
    return;
  }
  
  const parsedPage = parseInt(page) || 1;
  const searchPage = parsedPage < 1 ? 1 : parsedPage;

  try {
    const response = await axios.get(`${url}/search/${query}?page=${searchPage}`);

    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);
      const mangaList = [];

      $('.daily-update .panel_story_list .story_item').each((index, element) => {
        const mangaID = $(element).find('a').attr('href').replace('/manga/', '');
        const thumbnail = $(element).find('a img').attr('src');
        const title = $(element).find('a img').attr('alt');
        const authorInfo = $(element).find('.story_item_right span:eq(0)').text().replace('Author(s) : ', '');
        const author = authorInfo.split('\n').map(author => author.trim()).filter(author => author !== '');
        const update = $(element).find('.story_item_right span:eq(1)').text().replace('Updated : ', '').trim();
        const view = $(element).find('.story_item_right span:eq(2)').text().replace('View : ', '').trim();

        mangaList.push({
          id: mangaID,
          img: thumbnail,
          title,
          author,
          update,
          view,
        });
      });

      const currentPage = $('.panel_page_number .group_page .page_select').text().trim();
      const totalPage = $('.panel_page_number .group_page .page_last').last().attr('href');
      var pageNumber = totalPage.match(/page=(\d+)/)[1];

      res.json({ results: mangaList, pages: { currentPage, totalPage: pageNumber, searchKey: query } });
    } else {
      res.status(response.status).json({ message: 'Failed to retrieve data' });
    }
  } catch (error) {
    console.error(`Caught an error: ${error.message}`);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
}
