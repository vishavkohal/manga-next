// Import necessary libraries
// pages/api/latest-releases.js
import axios from 'axios';
import urlModule from 'url'; 
import cheerio from 'cheerio';

const url = 'https://ww7.mangakakalot.tv';


// The API handler function
export default async function handler(req, res) {
    let page = parseInt(req.query.page) || 1; // Retrieve the 'page' query parameter
    if (page < 1) page = 1;

    try {
        const response = await axios.get(`${url}/manga_list/?type=latest&category=all&state=all&page=${page}`);
        if (response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);
            const results = [];

            $('.truyen-list .list-truyen-item-wrap').each((index, element) => {
                const mangaID = $(element).find('a:eq(0)').attr('href').replace('/manga/', '');
                const img = `${url}${$(element).find('a:eq(0) img').attr('data-src')}`;
                const title = $(element).find('a:eq(0)').attr('title');
                const latestChapter = $(element).find('a:eq(2)').attr('title') || "N/A";
                const chapterID = $(element).find('a:eq(2)').attr('href') ? $(element).find('a:eq(2)').attr('href').replace('/chapter/', '') : "N/A";
                const view = $(element).find('.aye_icon').text().trim();
                const description = $(element).find('p').text().trim();

                results.push({
                    mangaID, img, title, latestChapter, chapterID, view, description
                });
            });

            const currentPage = $('.panel_page_number .group_page .page_select').text();
            const totalPage = $('.panel_page_number .group_page .page_last').last().attr('href');
            const parsedUrl = urlModule.parse(totalPage, true);
            const pageNumber = parsedUrl.query.page; // Assuming 'page' is a query parameter in the 'totalPage' URL

            results.push({ 'page': currentPage, 'totalPage': pageNumber });

            // Return results as JSON
            res.status(200).json({ results });
        }
    } catch (error) {
        console.error(`Caught an error: ${error.message}`);
        // Send an error status with the message
        res.status(500).json({ errorMessage: error.message });
    }
}
