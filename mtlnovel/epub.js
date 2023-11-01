import fs from "fs";
import epub from "epub-gen";

const options = {
  title: "Evolution From the Big Tree",
  author: "NA",
  output: "Evolution-From-the-Big-Tree.epub",
  content: [],
};

// let jsonData = [];

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
// console.log(options);
