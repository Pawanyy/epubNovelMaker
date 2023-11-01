import fs from "fs";
import epub from "epub-gen";

const options = {
  title: "The Lords Coins Aren't Decreasing",
  author: "NA",
  output: "the-lords-coins-arent-decreasing.epub",
  content: [],
};

// let jsonData = [];
console.time("Start_Gen_EPUB");
fs.readFile("data.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error:", err.message);
    return;
  }

  try {
    const jsonData = JSON.parse(data);

    for (let i = 0; i < jsonData.length; i++) {
      const element = jsonData[i];

      options.content.push({
        title: element.title,
        data: element.content,
      });
    }

    new epub(options).promise.then(() => console.log("Done"));
    // console.log(jsonData);
  } catch (parseError) {
    console.error("Error parsing JSON:", parseError.message);
  }
});

console.timeEnd("Start_Gen_EPUB");
// console.log(options);
