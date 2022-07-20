import type {NextApiRequest, NextApiResponse} from "next";

import api from "../../job/api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Checks if the secret is correct
  if (req.headers["x-secret"] === process.env.SECRET) {
    // Get all job paths
    const jobs = await api.list();

    // Revalidate index path
    await res.revalidate("/");

    // Revalidate id paths
    const result = await Promise.allSettled(jobs.map((job) => res.revalidate(`/${job.id}`)));

    // Send a success response
    return res.status(200).json(result);
  }

  // Send a failure response
  return res.status(401).json({message: "Unauthorized"});
}
