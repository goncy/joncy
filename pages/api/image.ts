import {NextApiRequest, NextApiResponse} from "next";

interface GetRequest extends NextApiRequest {
  query: {
    url: string;
  };
}

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method !== "GET") {
    return res.status(400).end();
  }

  const {
    query: {url},
  } = req as GetRequest;

  return fetch(url)
    .then((response) => {
      res.setHeader("content-type", response.headers.get("content-type"));
      res.setHeader("content-length", response.headers.get("content-length"));
      res.setHeader("etag", response.headers.get("etag"));
      res.setHeader("date", response.headers.get("date"));
      res.setHeader("cache-control", "public, immutable, max-age=31536000");

      return res.status(200).send(response.body);
    })
    .catch((error) => res.status(500).end(error.message));
};
