// for bulk downloading pdf files from urls (developed for client's need)

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const express = require("express");
const router = express.Router();

const urls = [
    "https://patents.google.com/patent/US5419196A/en",
    "https://patents.google.com/patent/US5578758A/en",
    "https://patents.google.com/patent/US4468966A/en",
    "https://patents.google.com/patent/US4577494A/en",
    "https://patents.google.com/patent/US5605099A/en",
    "https://patents.google.com/patent/US5009014A/en",
    "https://patents.google.com/patent/US5012413A/en",
    "https://patents.google.com/patent/US5617639A/en",
    "https://patents.google.com/patent/US6334396B2/en",
    "https://patents.google.com/patent/US5584641A/en",
    "https://patents.google.com/patent/EP0727524A3/en",
    "https://patents.google.com/patent/US5191838A/en",
    "https://patents.google.com/patent/US4452146A/en",
];

const pdfFolder = path.join(__dirname, 'downloaded_pdfs');
if (!fs.existsSync(pdfFolder)) {
    fs.mkdirSync(pdfFolder);
}

const downloadPDF = async (pdfUrl, fileName) => {
    const response = await axios.get(pdfUrl, { responseType: 'stream' });
    const filePath = path.join(pdfFolder, fileName);
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
};

const scrapePage = async (url) => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const pdfLink = $('a:contains("Download PDF")').attr('href');

        if (pdfLink) {
            const pdfUrl = new URL(pdfLink, url).href;
            const pdfName = pdfUrl.split('/').pop();
            await downloadPDF(pdfUrl, pdfName);
            console.log(`Downloaded: ${pdfName}`);
        } else {
            console.log(`No PDF link found on ${url}`);
        }
    } catch (error) {
        console.error(`Error scraping ${url}:`, error.message);
    }
};

const downloadAllPDFs = async () => {
    for (let url of urls) {
        await scrapePage(url);
    }
};

router.get("/download", async (req, res) => {
    downloadAllPDFs().then(() => {
        console.log('All PDFs downloaded');
    });
});

module.exports = router;