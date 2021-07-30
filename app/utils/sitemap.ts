import {Job} from "../../job/types";

export function buildSitemap(jobs: Job[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
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
  `;
}
