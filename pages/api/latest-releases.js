// pages/api/latest-releases.js
import axios from 'axios';
import cheerio from 'cheerio';

const url = 'https://ww7.mangakakalot.tv';

async function latestRelease() {
    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);
            const mangaList = [];

            $('#contentstory .itemupdate.first').each((index, element) => {
                const mangaID = $(element).find('a').attr('href').replace('/manga/', '');
                const thumbnail = `${url}${$(element).find('a img').attr('data-src')}`;
                const title = $(element).find('ul li:eq(0) h3 a').text().trim();
                const chapters = [];
                $(element).find('ul li').each((ind, ele) => {
                    if (ind === 0) {
                        return;
                    }
                    const chapterID = $(ele).find('span a').attr('href').replace('/chapter/', '');
                    const chapter = $(ele).find('span a').attr('title');
                    const update = $(ele).find('i').text().trim();

                    chapters.push({ chapterID, chapter, update });
                });
                
                const mangaInfo = {
                    'id': mangaID,
                    'img': thumbnail,
                    title,
                    chapters
                };
                mangaList.push(mangaInfo);
            });

            return { 'results': mangaList };
        }
    } catch (error) {
        console.error(`Caught an error: ${error.message}`);
        return { error: error.message };
    }
}

export default async (req, res) => {
    const data = await latestRelease();

    if (data.results) {
        res.status(200).json(data);
    } else {
        res.status(500).json({ error: "Failed to fetch the latest releases." });
    }
};
