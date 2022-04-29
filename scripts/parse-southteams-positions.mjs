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
    // Get id and title from top row
    const [id, title] = _title.replace(/ \(. opening\/s\)/i, "").split(" - ");

    // Parse rate
    const rate = _rate.replace("Average Rate: $", "~ USD ");

    // Build whatsapp text
    const waText = encodeURIComponent(`Estoy interesado en la posición ${id} de Southteams.

LinkedIn: <completar>
Email: <completar>

Confirmo que tengo un nivel de inglés conversacional que me permite compeltar una jornada laboral con gente que no habla español.`);

    // Create the link
    const link = `https://wa.me?phone=5491141634695&text=${waText}`;

    // Return the registry
    return {
      id: `southteams-${id}`,
      title,
      company: "Southteams",
      seniority: "sr",
      description,
      image: "https://pbs.twimg.com/profile_images/1172237780405170181/l_i50dqG.jpg",
      tags: "",
      rate,
      link,
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
