const fs = require('fs');
const rootPath = './data/';
const cheerio = require('cheerio');
const axios = require('axios');

const client = axios.create({
  proxy: false,
});

async function getDataFromUrl(url, fileName) {
  try {
    const dataResult = await client.get(url);
    let $ = cheerio.load(dataResult.data);
    let dataParse = parseData($).toArray();
    try {
      const pathFile = rootPath + fileName + '.json';
      fs.writeFileSync(pathFile, JSON.stringify(dataParse))
    } catch (e) {
      console.log(e);
    }
  } catch (e) {
    console.log(e);
  }
}

function parseData($) {
  return $('table tr').map((idx, tr) => {
    if (idx === 0) return;
    tr = $(tr);
    const dataTd = tr.find('td');
    const hira = $(dataTd[1]).text();
    const kanji = $(dataTd[2]).text() ? $(dataTd[2]).text() : '';
    const meaning = $(dataTd[3]).text();
    return {hira, kanji, meaning}
  });
}

function readDataFromJson(lesson) {
  try {
    const dataRaw = fs.readFileSync(rootPath + lesson + '.json').toString();
    return JSON.parse(dataRaw);
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  getDataFromUrl,
  readDataFromJson
}
