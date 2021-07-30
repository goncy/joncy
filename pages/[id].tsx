import {ParsedUrlQuery} from "querystring";

import * as React from "react";
import {GetStaticPaths, GetStaticProps} from "next";
import Head from "next/head";

import {Job} from "../job/types";
import api from "../job/api";
import JobScreen from "../job/screens/Job";

interface Props {
  job: Job;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

function IdRoute({job}: Props): JSX.Element {
  return (
    <>
      <Head>
        <title>
          Joncy - {job.company} - {job.title}
        </title>
        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
        {/* Start meta tags */}
        <meta content="goncy" name="author" />
        <meta content="Gonzalo Pozzo" name="copyright" />
        <meta content={job.description} name="description" />
        <meta content="purple" name="theme-color" />
        <meta content={`joncy,trabajo it,programación,${job.tags.join(",")}`} name="keywords" />
        <meta content="Joncy - Trabajos IT" property="og:site_name" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta content="@goncy" name="twitter:creator" />
        <meta content="@goncy" name="twitter:site" />
        <meta content={`Joncy - ${job.company} - ${job.title}`} name="twitter:title" />
        <meta content={job.description} property="og:description" />
        <meta content={`${process.env.NEXT_PUBLIC_URL}/assets/banner.jpg`} property="og:image" />
        <meta
          content={`${process.env.NEXT_PUBLIC_URL}/api/image?url=${encodeURIComponent(job.image)}`}
          property="og:image:secure"
        />
        <meta
          content={`${process.env.NEXT_PUBLIC_URL}/api/image?url=${encodeURIComponent(job.image)}`}
          property="og:image:url"
        />
        <meta content="image/jpeg" property="og:image:type" />
        <meta content="256" property="og:image:width" />
        <meta content="256" property="og:image:height" />
        <meta content={job.company} property="og:image:alt" />
        {/* End meta tags */}
      </Head>
      <JobScreen job={job} />
    </>
  );
}

export const getStaticProps: GetStaticProps<unknown, Params> = async ({params}) => {
  try {
    // Fetch the selected job
    const job = await api.fetch(params.id);

    // If job doesn't exist, throw an error
    if (!job) {
      throw new Error("No se encontró la oportunidad");
    }

    return {
      // Revalidate every 6 hours
      revalidate: 3600 * 6,
      props: {
        job,
      },
    };
  } catch (error) {
    // Handle error on error screen
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Just prefetch paths on production
  if (process.env.NODE_ENV === "production") {
    // Fetch all jobs
    const jobs = await api.list();

    return {
      // Map job id as param
      paths: jobs.map((job) => ({
        params: {id: job.id},
      })),
      // Build not relevant ones on demand
      fallback: "blocking",
    };
  }

  // Don't prefetch for non production environments
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default IdRoute;
