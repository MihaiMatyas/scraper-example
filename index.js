const PORT = 8000;

const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();

let url = 'https://www.theguardian.com/international';

axios(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const articles = [];

        $('.fc-item__title', html).each((i, elem) => {
            const title = $(elem).text();
            const url = $(elem).find('a').attr('href');
            articles.push({
                title,
                url
            });
        });
        console.log(articles);
    }).catch(err => console.log(err));

app.listen(PORT, () => console.log(`server running on port ${PORT}`))