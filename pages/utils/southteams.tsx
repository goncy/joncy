import * as React from "react";
import {GetStaticProps} from "next";
import Head from "next/head";
import {Stack, Textarea} from "@chakra-ui/react";
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

const SouthteamsUtilPage: React.FC = () => {
  const [input, setInput] = React.useState<string>(``);
  const [output, setOutput] = React.useState<string>(``);

  function handleTransform(e: React.ChangeEvent<HTMLTextAreaElement>) {
    try {
      // Retrieve input
      const input = e.target.value;

      // Set input
      setInput(input);

      let [featured, nonFeatured] = input
        .replace(
          "High Priority Positions\nThis positions are Most Pressing this week. This means candidates presented for them will have absolute priority on consideration and booking interviews. All other positions remain open nonetheless and we'll receive your candidates too.\n\n",
          "",
        )
        .replace("\nPositions with normal priority.\n\n", "")
        .split("Open Positions");

      const raw = featured
        .concat(`\n\n${nonFeatured}`)
        .split(` - This rate is just average.`)
        .map((position) => position.trim())
        .map((position) => position.split("\n").filter(Boolean))
        .filter((position) => position.length)
        .map(([_title, description, _rate]) => {
          // Get id and title from top row
          const [id, title] = _title.replace(/ \(. opening\/s\)/i, "").split(" - ");

          // Parse rate
          const rate = _rate.replace("Average Rate: $", "~ USD ");

          // Build whatsapp text
          const waText =
            encodeURIComponent(`Estoy interesado en la posición ${id} - ${title} de Southteams.

LinkedIn: \${ tokens["Perfil de LinkedIn"] }
Email: \${ tokens["Email"] }
Salario pretendido: \${ tokens["Salario pretendido"] }
Teléfono: \${ tokens["Teléfono"] }

Confirmo que tengo un nivel de inglés conversacional que me permite completar una jornada laboral con gente que no habla español.`);

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
            createdAt: "",
            expiredAt: "",
            featured: featured.includes(_title) ? "TRUE" : "",
          };
        });

      // Convert JSON to CSV
      const result = papaparse.unparse(raw, {header: false});

      // Set output
      setOutput(result);
    } catch (e) {
      // If something fails show an invalid input response
      setOutput("Invalid input");
    }
  }

  return (
    <>
      <Head>
        <title>Joncy - Trabajos IT</title>
        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
        {/* Start meta tags */}
        <meta content="goncy" name="author" />
        <meta content="Gonzalo Pozzo" name="copyright" />
        <meta
          content="Joncy es un portal de empleos relevantes para la comunidad, con beneficios para empresas con búsquedas para primer trabajo o minorías"
          name="description"
        />
        <meta content="purple" name="theme-color" />
        <meta content="trabajo,frontend,backend,trainee,junior,semisenior,senior" name="keywords" />
        <meta content="Joncy - Trabajos IT" property="og:site_name" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta content="@goncy" name="twitter:creator" />
        <meta content="@goncy" name="twitter:site" />
        <meta content="Joncy - Trabajos IT" name="twitter:title" />
        <meta
          content="Joncy es un portal de empleos relevantes para la comunidad, con beneficios para empresas con búsquedas para primer trabajo o minorías"
          property="og:description"
        />
        <meta content={`${process.env.NEXT_PUBLIC_URL}/assets/banner.jpg`} property="og:image" />
        <meta
          content={`${process.env.NEXT_PUBLIC_URL}/assets/banner.jpg`}
          property="og:image:secure"
        />
        <meta
          content={`${process.env.NEXT_PUBLIC_URL}/assets/banner.jpg`}
          property="og:image:url"
        />
        <meta content="image/jpeg" property="og:image:type" />
        <meta content="1920" property="og:image:width" />
        <meta content="200" property="og:image:height" />
        <meta content="Joncy - Trabajos IT" property="og:image:alt" />
        {/* End meta tags */}
      </Head>

      <Stack padding={4}>
        <Textarea
          placeholder="Paste Southteams positions email"
          rows={20}
          value={input}
          onChange={handleTransform}
        />
        <Textarea readOnly placeholder="CSV Output" rows={20} value={output} />
      </Stack>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  if (process.env.NEXT_PUBLIC_ENV === "production") {
    // This util is only available in development
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
};

export default SouthteamsUtilPage;
