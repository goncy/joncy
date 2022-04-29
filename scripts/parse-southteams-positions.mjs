import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";

import papaparse from "papaparse";

const POSITIONS = ``;

// Parse positions
const data = POSITIONS.split(` - This rate is just average.`)
  .map((position) => position.trim())
  .map((position) => position.split("\n").filter(Boolean))
  .filter((position) => position.length)
  .map(([_title, description, _rate]) => {
    const [id, title] = _title.replace(/ \(. opening\/s\)/i, "").split(" - ");
    const rate = _rate.replace("Average Rate: $", "~ USD ");

    return {
      id: `southteams-${id}`,
      title,
      company: "Southteams",
      seniority: "sr",
      description: description.replace(/\s/g, " "),
      image: "https://pbs.twimg.com/profile_images/1172237780405170181/l_i50dqG.jpg",
      tags: "",
      min: rate,
      max: "",
      link: "",
      expiredAt: "",
      featured: "",
    };
  });

// Convert JSON to CSV
const result = papaparse.unparse(data, {header: false});

// Get fileurl from current file
const __filename = fileURLToPath(import.meta.url);

// Get current file firectory
const __dirname = path.dirname(__filename);

// Get file path for temp csv file
const tempFile = path.join(__dirname, "/temp", "southteams.csv");

// Write file
fs.writeFileSync(tempFile, result);
