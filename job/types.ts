export interface Job {
  id: string;
  title: string;
  company: string;
  description?: string;
  image?: string;
  min?: string;
  max?: string;
  tags: string[];
  link: string;
  featured: boolean;
  createdAt: number;
  expiredAt: number;
  seniority: string[];
}

export interface RawJob extends Omit<Job, "tags" | "seniority"> {
  tags: string;
  seniority: string;
}
