import {useMemo, useRef, useState} from "react";
import {GetStaticProps} from "next";
import Head from "next/head";
import {
  Stack,
  Text,
  Image,
  Textarea,
  FormControl,
  FormLabel,
  Link,
  Wrap,
  WrapItem,
  Button,
} from "@chakra-ui/react";
import jsPDF from "jspdf";

export type Profile = {
  $schema: string;
  error?: string;
  basics: {
    name: string;
    label: string;
    image: string;
    email: string;
    phone: string;
    url: string;
    summary: string;
    location: {
      countryCode: string;
      address: string;
    };
    profiles: Array<{
      network: string;
      username: string;
      url: string;
    }>;
  };
  work: Array<{
    name: string;
    position: string;
    startDate: string;
    endDate: string;
    highlights: Array<any>;
    url: string;
    location?: string;
    summary?: string;
  }>;
  volunteer: Array<{
    organization: string;
    position: string;
    startDate: string;
    endDate: string;
    summary: string;
    highlights: Array<any>;
    url: string;
  }>;
  education: Array<{
    institution: string;
    area: string;
    studyType: string;
    startDate: string;
    endDate: string;
    score: string;
    courses: Array<any>;
  }>;
  awards: Array<any>;
  certificates: Array<{
    name: string;
    issuer: string;
    startDate?: string;
    url?: string;
  }>;
  publications: Array<{
    name: string;
    publisher: string;
    releaseDate: string;
    summary: string;
    url: string;
  }>;
  skills: Array<{
    name: string;
    level: string;
    keywords: Array<any>;
  }>;
  languages: Array<{
    language: string;
    fluency: string;
  }>;
  interests: Array<any>;
  references: Array<{
    name: string;
    reference: string;
  }>;
  projects: Array<{
    name: string;
    startDate: string;
    summary: string;
    url: string;
    endDate?: string;
  }>;
  meta: {
    version: string;
    canonical: string;
  };
};

const CVUtilPage: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const profile = useMemo<Profile>(() => {
    try {
      return JSON.parse(input);
    } catch (e) {
      return {error: "Unexpected input"};
    }
  }, [input]);
  const cv = useRef<HTMLDivElement>(null);

  function handleSave() {
    const doc = new jsPDF();

    doc.html(cv.current, {
      callback: function (doc) {
        doc.save();
      },
      margin: 5,
      windowWidth: 1246,
      width: 200,
    });
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

      <Stack padding={4} spacing={4}>
        <FormControl>
          <FormLabel>Input</FormLabel>
          <Textarea rows={12} value={input} onChange={(e) => setInput(e.target.value)} />
        </FormControl>
        {profile.error ? (
          <Text>{profile.error}</Text>
        ) : (
          <Stack ref={cv} backgroundColor="white" color="black" direction="row">
            <Stack backgroundColor="gray.100" minWidth={320}>
              {profile.basics.image && <Image alt="Gonzalo Pozzo" src={profile.basics.image} />}
              <Stack padding={4} spacing={6}>
                <Stack spacing={0}>
                  <Text fontSize="2xl" fontWeight="bold">
                    {profile.basics.name}
                  </Text>
                  <Text>{profile.basics.label}</Text>
                </Stack>
                <Stack spacing={1}>
                  <Text fontSize="xl" fontWeight={500}>
                    Profiles
                  </Text>
                  {profile.basics.profiles.map((profile) => (
                    <Text key={profile.network}>
                      <Text as="span" fontWeight={500}>
                        {profile.network}
                      </Text>
                      :{" "}
                      <Link isExternal href={profile.url}>
                        {profile.url}
                      </Link>
                    </Text>
                  ))}
                </Stack>
              </Stack>
            </Stack>
            <Stack padding={4} spacing={6}>
              {profile.basics.summary && (
                <Stack>
                  <Text fontSize="2xl" fontWeight={500}>
                    Bio
                  </Text>
                  <Text whiteSpace="pre-wrap">{profile.basics.summary}</Text>
                </Stack>
              )}
              {profile.work.length && (
                <Stack spacing={3}>
                  <Text fontSize="2xl" fontWeight="bold">
                    Experience
                  </Text>
                  <Stack spacing={6}>
                    {profile.work.map((work) => (
                      <Stack key={`${work.name} ${work.position}`}>
                        <Stack spacing={0}>
                          <Text fontSize="xs" lineHeight="normal">
                            {work.startDate} - {work.endDate || "Ongoing"}
                          </Text>
                          <Text fontSize="xl" fontWeight={500} lineHeight="normal">
                            {work.name}
                          </Text>
                          <Text color="primary.500" fontSize="md">
                            {work.position}
                          </Text>
                        </Stack>
                        {work.summary && <Text whiteSpace="pre-wrap">{work.summary}</Text>}
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              )}
              {profile.education.length && (
                <Stack spacing={3}>
                  <Text fontSize="2xl" fontWeight="bold">
                    Education
                  </Text>
                  <Stack spacing={6}>
                    {profile.education.map((education) => (
                      <Stack key={`${education.institution} ${education.studyType}`}>
                        <Stack spacing={0}>
                          <Text fontSize="xs">
                            {education.startDate} - {education.endDate || "Ongoing"}
                          </Text>
                          <Text fontSize="xl" fontWeight={500}>
                            {education.studyType}
                          </Text>
                          <Text color="primary.500">{education.institution}</Text>
                        </Stack>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              )}
              {profile.certificates.length && (
                <Stack spacing={3}>
                  <Text fontSize="2xl" fontWeight="bold">
                    Certificates
                  </Text>
                  <Stack spacing={6}>
                    {profile.certificates.map((certificate) => (
                      <Stack key={`${certificate.name} ${certificate.issuer}`}>
                        <Stack spacing={0}>
                          <Text fontSize="xs">{certificate.startDate}</Text>
                          <Text fontSize="xl" fontWeight={500}>
                            {certificate.name}
                          </Text>
                          <Text color="primary.500">{certificate.issuer}</Text>
                        </Stack>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              )}
              {profile.skills.length && (
                <Stack spacing={3}>
                  <Text fontSize="2xl" fontWeight="bold">
                    Skills
                  </Text>
                  <Wrap spacingX={6}>
                    {profile.skills.map((skill) => (
                      <WrapItem key={skill.name}>
                        <Text
                          borderRadius="sm"
                          color="primary.500"
                          fontSize="xs"
                          fontWeight="bold"
                          padding={1}
                          textTransform="uppercase"
                        >
                          {skill.name}
                        </Text>
                      </WrapItem>
                    ))}
                  </Wrap>
                </Stack>
              )}
            </Stack>
          </Stack>
        )}
        <Button onClick={handleSave}>Export CV to PDF</Button>
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

export default CVUtilPage;
