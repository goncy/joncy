import type {NextApiRequest, NextApiResponse} from "next";

import api from "../../job/api";

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const jobs = await api.list();

  res.setHeader("Content-Type", "application/xml");
  res.setHeader("Cache-Control", "public, s-max-age=3600, stale-while-revalidate=59");

  return res.end(`<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
          <loc>${process.env.NEXT_PUBLIC_URL}</loc>
      </url>
      ${jobs
        .map(({id}) => {
          return `
              <url>
                  <loc>${`${process.env.NEXT_PUBLIC_URL}/${id}`}</loc>
              </url>
          `;
        })
        .join("")}
  </urlset>
  `);
}
