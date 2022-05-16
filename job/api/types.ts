import {Job} from "../types";

export interface RawJob
  extends Omit<Job, "tags" | "seniority" | "featured" | "createdAt" | "expiredAt"> {
  tags: string;
  seniority: string;
  featured: boolean | string;
  expiredAt: number | string;
  createdAt: number | string;
}
