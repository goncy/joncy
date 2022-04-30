import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";

import papaparse from "papaparse";

const TAGS = [
  {id: "javascript", matcher: (query) => query.match(/javascript|js/gi)},
  {id: "typescript", matcher: (query) => query.includes("typescript")},
  {id: "azure", matcher: (query) => query.includes("azure")},
  {id: "aws", matcher: (query) => query.includes("aws")},
  {id: "figma", matcher: (query) => query.includes("figma")},
  {id: "php", matcher: (query) => query.includes("php")},
  {id: "selenium", matcher: (query) => query.includes("selenium")},
  {id: "xd", matcher: (query) => query.includes("xd")},
  {id: "nosql", matcher: (query) => query.match(/mongo|couch/gi)},
  {id: "cypress", matcher: (query) => query.includes("cypress")},
  {id: "testing", matcher: (query) => query.includes("testing")},
  {id: "react", matcher: (query) => query.match(/react/gi)},
  {id: "react native", matcher: (query) => query.includes("react native")},
  {id: "angular", matcher: (query) => query.includes("angular")},
  {id: "vue", matcher: (query) => query.includes("vue")},
  {id: "redux", matcher: (query) => query.includes("redux")},
  {id: "kubernetes", matcher: (query) => query.includes("kubernetes")},
  {id: "sql", matcher: (query) => query.match(/(?!no)sql/gi)},
  {id: "docker", matcher: (query) => query.includes("docker")},
  {id: ".net", matcher: (query) => query.match(/net(?!\S)/gi)},
  {id: "java", matcher: (query) => query.match(/java(?!script)/gi)},
  {id: "nodejs", matcher: (query) => query.includes("node")},
  {id: "webdriver", matcher: (query) => query.includes("webdriver")},
  {id: "jmeter", matcher: (query) => query.includes("jmeter")},
  {id: "ux", matcher: (query) => query.includes("ux")},
  {id: "express", matcher: (query) => query.includes("express")},
  {id: "shopify", matcher: (query) => query.includes("shopify")},
  {id: "xamarin", matcher: (query) => query.includes("xamarin")},
  {id: "android", matcher: (query) => query.includes("android")},
  {id: "ios", matcher: (query) => query.match(/ios|swift|objectivec|objective c/gi)},
  {id: "kotlin", matcher: (query) => query.includes("kotlin")},
  {id: "swift", matcher: (query) => query.includes("swift")},
  {id: "c#", matcher: (query) => query.includes("c#")},
  {id: "c++", matcher: (query) => query.includes("c++")},
  {id: "salesforce", matcher: (query) => query.includes("salesforce")},
];

const POSITIONS = `769 - Sr. QA Automation (3 opening/s)
We are looking for a QA Automation engineer with +3 years of experience building automation tests and unit tests using Javascript. Experience with Mocha, WebDriver, Cypress or similar frameworks is required. IMPORTANT: This position requires candidates from Argentina or Uruguay.

Average Rate: $4000 - This rate is just average.

775 - Sr. DevOps Engineer (Azure) (1 opening/s)
We are looking for a DevOps Engineer with at least 4 years in the role. Experience with Microsoft Azure is required, experience with AWS is a plus. As well as Docker, Azure Kubernetes Service, Azure IaaS Compute / Storage / Databases / Networking/ Monitoring-auditing & Security. AzureDevOps: CI/CD Pipelines, Ability to set permission and maintain Projects. Scripting Language (Automation), PowerShell Knowledge of Agile Development, Development and Cloud Architecture.

Average Rate: $5000 - This rate is just average.

781 - Sr. Backend Node.js (4 opening/s)
We are looking for a Sr. Backend Developer with at least 3 years of experience with Node.Js building rest APIs with Express.js or COA. Experience with integration with third-party systems is a must. Knowledge on other Javascript frameworks is a plus. IMPORTANT: This position requires candidates from Argentina or Uruguay.

Average Rate: $4500 - This rate is just average.

732 - UX/UI Designer (1 opening/s)
We are looking for a UX Designer with +3 years of experience working with responsive web design and a mobile first mentality. Experience working directly with stakeholders is required. Main work would be building web pages, dynamic landing pages, marketing campaign pages, checkout funnel and more.

Average Rate: $2000 - This rate is just average.

741 - iOS Developer (1 opening/s)
We are looking for a Sr. iOS developer with more than 4 years of experience with swift/ios development. Good understanding of TDD, good practices, design patterns and clean architecture.

Average Rate: $3500 - This rate is just average.

743 - Shopify developer (1 opening/s)
We are looking for a Senior Shopify developer with at least 4 years of experience with the platforms to work in a marketing and e-commerce project. We can take candidates from LATAM.

Average Rate: $2500 - This rate is just average.

748 - Sr. Java (4 opening/s)
We are looking for a senior software engineer with more than 6 years of experience using Java. We need at least 3 years of hands on experience on complex enterprise systems and good understanding of dependency injection, web containers like Jetty, Tomcat, IIS and microservices architectures. Experience on reverse engineering, aspect oriented programming, containerization (Kubernetes, docker, etc..) is a plus. Candidates with POS experience will have priority. IMPORTANT: Candidates from Argentina and Uruguay only.

Average Rate: $4500 - This rate is just average.

752 - Sr. QA Automation (2 opening/s)
We are looking for a Sr. QA Automation engineer with +4 years of experience using test automation tools like Selenium WebDriver or WebDriverIO testing web applications and Javascript language. Experience with bug tracking software like Jira or similar is required as well as SDLC and testing best practices. Experience working with retail, restaurant or grocery POS Systems is a plus as well as load testing tools like JMeter. IMPORTANT: Candidates from Argentina and Uruguay only.

Average Rate: $4000 - This rate is just average.

759 - Sr. Java + Angular (1 opening/s)
We are looking for a 4+ years of experience Fullstack Java + Angular engineer.

Average Rate: $3500 - This rate is just average.

761 - Sr. Backend Node.js (2 opening/s)
We are looking for a backend Node.js developer with experience +4 years of experience using express.js building rest APIs and integrating with third-party systems. Docker experience is a plus. Candidates with unit-testing and typescript experience will have priority. IMPORTANT: This position requires candidates from Argentina or Uruguay.

Average Rate: $4000 - This rate is just average.

764 - Sr. React (PHP migration) (1 opening/s)
We are looking for a senior frontend developer with at least +5 years of experience in React.js to work on migrating a PHP App to React.js / Node.js, so we need some level of PHP (Laravel) experience aswell. IMPORTANT: This position requires candidates from Argentina or Uruguay.

Average Rate: $3500 - This rate is just average.

767 - Sr. Mobile (Cordova, Capacitor or Ionic) (2 opening/s)
We are looking for a React.js developer with at least +4 years of experience building hybrid mobile apps with Cordova, CapacitorJS or Ionic. Ideal candidates will also have experience working with native Android development or iOS. IMPORTANT: This position requires candidates from Argentina or Uruguay.

Average Rate: $4500 - This rate is just average.

782 - Sr. Xamarin (1 opening/s)
We are looking for a Sr. Xamarin developer with +4 years of experience working with UWP/Xamarin building apps for Android. Experience working in the healthcare industry is a plus.

Average Rate: $4000 - This rate is just average.

783 - Mid-Level Front-end Developer (1 opening/s)
We are looking for a Mid-Level Front end developer with +3 years of experience in the following: HTML, CSS, JavaScript, DOM Manipulation, JSON, AJAX, Node.js, MySQL, Java, Bootstrap. Candidates with knowledge and experience in React and Angular will have priority.

Average Rate: $3000 - This rate is just average.

785 - Sr. Salesforce Developer (1 opening/s)
We are looking for a Salesforce developer with a least 3 years of experience working with Salesforce. We need experience on hands-on administration experience as well as technical implementations abilities. You will be developing new functionality as well as providing support to development teams. Salesforce Admin Certification is a really nice to have. IMPORTANT: This positions requires candidates from Argentina or Uruguay.

Average Rate: $4500 - This rate is just average.

786 - Mid-level Business Analyst (1 opening/s)
We are looking for a Business Analyst with a Bachelor’s degree in Business Administration, Information Sciences or equivalent degree and experience required of 3+ years’ experience in developing industry standard Business Requirements and Technical Specifications. Experience in Agile Software Development. Excellent communication skills in English. XP working with point of sales (POS), retail or e-commerce is required. IMPORTANT: Candidates from Argentina and Uruguay only.

Average Rate: $2500 - This rate is just average.

787 - Sr. Java Backend (1 opening/s)
We are looking for a senior software engineer with more than 5 years of experience using Java or .NET (C#). We need at least 3 years of hands on experience on complex enterprise systems like Supply Chain, Point of Sale, ERP, etc and good understanding of dependency injection, web containers like Jetty, Tomcat, IIS and microservices architectures. Experience on reverse engineering, aspect oriented programming and containerization (Kubernetes, docker, etc..) is a plus. IMPORTANT: Candidates from Argentina and Uruguay only.

Average Rate: $4000 - This rate is just average.`;

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
    const waText = encodeURIComponent(`Estoy interesado en la posición ${id} - ${title} de Southteams.

LinkedIn: \${ tokens["Perfil de LinkedIn"] }
Email: \${ tokens["Email"] }
Salario pretendido: \${ tokens["Salario pretendido"] }
Teléfono: \${ tokens["Teléfono"] }

Confirmo que tengo un nivel de inglés conversacional que me permite compeltar una jornada laboral con gente que no habla español.`);

    // Create the link
    const link = `https://wa.me?phone=5491141634695&text=${waText}`;

    // Get the tag matcher
    const matcher = `${title} ${description}`.toLowerCase();

    // Get tags
    const tags = TAGS.filter((tag) => tag.matcher(matcher))
      .map((tag) => tag.id)
      .join(",");

    // Return the registry
    return {
      id: `southteams-${id}`,
      title,
      company: "Southteams",
      seniority: "sr",
      description,
      image: "https://pbs.twimg.com/profile_images/1172237780405170181/l_i50dqG.jpg",
      tags,
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
