import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import fs from "fs";
import { exit } from "process";

const BASE_URL =
  "https://www.koreanmtl.online/p/the-lords-coins-arent-decreasing.html";

puppeteer.use(StealthPlugin());

const startScraping = async () => {
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will in full width and height)
  const browser = await puppeteer
    .launch({
      headless: true,
      defaultViewport: null,
      args: ["--start-maximized"],
    })
    .then(async (browser) => {
      let data = [];

      // Open a new page
      const page = await browser.newPage();

      // - wait until the dom content is loaded (HTML is ready)
      await page.goto(`${BASE_URL}`, {
        waitUntil: "domcontentloaded",
      });

      const hyperLinkElems = await page.$$("ul.a > li.a > a");

      const hyperLinks = [];
      for (const hyperLinkElem of hyperLinkElems) {
        const hyperLink = await page.evaluate((ele) => ele.href, hyperLinkElem);
        hyperLinks.push(hyperLink);
      }

      console.log("hyperLinks :>> ", hyperLinks);

      // await page.waitForTimeout(2000);

      // // Scroll to the bottom of the page
      // await page.evaluate(() => {
      //   window.scrollTo(50, document.body.scrollHeight);
      // });

      // Get the number of available options
      const OptionsCount = hyperLinks.length;

      // Iterate through each option
      for (const hyperLink of hyperLinks) {
        let pageData = {
          title: null,
          content: null,
        };

        // - wait until the dom content is loaded (HTML is ready)
        await page.goto(`${hyperLink}`, {
          waitUntil: "domcontentloaded",
        });

        const title = await page.$(".post-title");
        const content = await page.$(".post-body");

        pageData.title = await page.evaluate((ele) => ele.innerText, title);
        pageData.content = await page.evaluate((ele) => ele.innerHTML, content);

        // console.log("pageData >> ", pageData);
        console.log(pageData.title + " Done");

        data.push(pageData);
      }

      await writeData(fs, data);
      // console.log(data);
    });
};

const writeData = async (fs, data, fileName = "data.json") => {
  const jsonData = JSON.stringify(data, null, 2);

  fs.writeFile(fileName, jsonData, "utf8", (err) => {
    if (err) {
      console.error("Error writing to JSON file:", err);
      return;
    }
    console.log("Data written to JSON file successfully.");
  });
};

console.time("Start_Scraping");
// Start the scraping
await startScraping();
console.timeEnd("Start_Scraping");

// exit();
