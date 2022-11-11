// const puppeteer = require("puppeteer");
// const fs = require("fs");
// const path = require("path");

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   page.on("response", async (response) => {
//     const url = response.url();
//     if (response.request().resourceType() === "image") {
//       response.buffer().then((file) => {
//         const fileName = url.split("/").pop();
//         const filePath = path.resolve(__dirname, fileName);
//         const writeStream = fs.createWriteStream(filePath);
//         writeStream.write(file);
//       });
//     }
//   });
//   await page.goto(
//     "https://www.tumblr.com/bevsi/699575622950862848/happy-halloween-eve"
//   );
//   await browser.close();
// })();

var fs = require('fs'),
  http = require('http'),
  https = require('https');

var Stream = require('stream').Transform;

// Download Image Helper Function
var downloadImageFromURL = (url, filename, callback) => {

  var client = http;
  if (url.toString().indexOf("https") === 0) {
    client = https;
  }

  client.request(url, function (response) {
    var data = new Stream();

    response.on('data', function (chunk) {
      data.push(chunk);
    });

    response.on('end', function () {
      fs.writeFileSync(filename, data.read());
    });
  }).end();
};

// Calling Function to Download
downloadImageFromURL('https://oaidalleapiprodscus.blob.core.windows.net/private/org-1nvXFlSzwuTzmg1WTc0CyxH8/user-dCnXaOwoDfXO2j6cDTgnSXhW/img-FTPySv7vtHgbot5ov3en2ZBV.png?st=2022-11-11T21%3A03%3A18Z&se=2022-11-11T23%3A03%3A18Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-11-11T01%3A26%3A06Z&ske=2022-11-12T01%3A26%3A06Z&sks=b&skv=2021-08-06&sig=tGTQhzidIkTeTFDChA1jXcwdUJ5Sn0DOYWmg7ppSL%2BI%3D', 'test1.png');

