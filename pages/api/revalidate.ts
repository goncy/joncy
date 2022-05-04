import type {NextApiRequest, NextApiResponse} from "next";

import api from "../../job/api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.headers["x-secret"] === process.env.SECRET) {
    const jobs = await api.list();

    for (const job of jobs) {
      res.unstable_revalidate(`/${job.id}`);
    }

    return res.unstable_revalidate("/");
  }

  return res.status(401).json({message: "Unauthorized"});
}
