const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on("response", async (response) => {
    const url = response.url();
    if (response.request().resourceType() === "image") {
      response.buffer().then((file) => {
        const fileName = url.split("/").pop();
        const filePath = path.resolve(__dirname, fileName);
        const writeStream = fs.createWriteStream(filePath);
        writeStream.write(file);
      });
    }
  });
  await page.goto(
    "https://www.tumblr.com/bevsi/699575622950862848/happy-halloween-eve"
  );
  await browser.close();
})();
