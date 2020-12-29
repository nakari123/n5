const express = require('express');
const util = require("./util");
const app = express();

async function main() {
  app.get('/get-vocabulary', function (req, res) {
    try {
      let lesson = req.query.lesson ? req.query.lesson : 1;
      const data = util.readDataFromJson(lesson);
      if (data) {
        res.send(data);
      } else {
        res.send('Data Not Found')
      }
    } catch (e) {
      console.log(e);
    }
  });

  app.get('/get-lesson', function (req, res) {
    try {
      let url = req.query.url;
      let lesson = req.query.lesson;
      try {
        util.getDataFromUrl(url, lesson);
        res.send('get data success');
      } catch (e) {
        res.send('get data fail');
      }
    } catch (e) {
      console.log(e);
    }
  });
  let server = app.listen(3000, () => console.log('server app listening on port 3000!'));
  server.timeout = 10000000;
}

main().catch(console.error.bind(console));
