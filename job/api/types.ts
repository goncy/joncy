import {Job} from "../types";

export interface RawJob extends Omit<Job, "tags" | "seniority"> {
  tags: string;
  seniority: string;
}
