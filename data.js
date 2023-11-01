import fs from "fs";

let elements = [];

fs.readFile("data.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error:", err.message);
    return;
  }

  try {
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (parseError) {
    console.error("Error parsing JSON:", parseError.message);
  }
});
