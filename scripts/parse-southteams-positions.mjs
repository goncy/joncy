import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";

import papaparse from "papaparse";

const POSITIONS = `769 - Sr. QA Automation (3 opening/s)
We are looking for a QA Automation engineer with +3 years of experience building automation tests and unit tests using Javascript. Experience with Mocha, WebDriver, Cypress or similar frameworks is required. IMPORTANT: This position requires candidates from Argentina or Uruguay.

Average Rate: $4000 - This rate is just average.

775 - Sr. DevOps Engineer (Azure) (1 opening/s)
We are looking for a DevOps Engineer with at least 4 years in the role. Experience with Microsoft Azure is required, experience with AWS is a plus. As well as Docker, Azure Kubernetes Service, Azure IaaS Compute / Storage / Databases / Networking/ Monitoring-auditing & Security. AzureDevOps: CI/CD Pipelines, Ability to set permission and maintain Projects. Scripting Language (Automation), PowerShell Knowledge of Agile Development, Development and Cloud Architecture.

Average Rate: $5000 - This rate is just average.

781 - Sr. Backend Node.js (4 opening/s)
We are looking for a Sr. Backend Developer with at least 3 years of experience with Node.Js building rest APIs with Express.js or COA. Experience with integration with third-party systems is a must. Knowledge on other Javascript frameworks is a plus. IMPORTANT: This position requires candidates from Argentina or Uruguay.

Average Rate: $4500 - This rate is just average.`;

// Parse positions
const data = POSITIONS.split(` - This rate is just average.`)
  .map((position) => position.trim())
  .map((position) => position.split("\n").filter(Boolean))
  .filter((position) => position.length)
  .map(([_title, description, _rate]) => {
    const [id, title] = _title.replace(/ \(. opening\/s\)/i, "").split(" - ");
    const rate = _rate.replace("Average Rate: $", "~ USD ");
    const waText = encodeURIComponent(`Estoy interesado en la posición ${id} de Southteams.

LinkedIn: <completar>
Email: <completar>

Confirmo que tengo un nivel de inglés conversacional que me permite compeltar una jornada laboral con gente que no habla español.`);
    const link = `https://wa.me?phone=5491141634695&text=${waText}`;

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
