export interface Job {
  id: string;
  position: string;
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
}

export interface RawJob extends Omit<Job, "tags"> {
  tags: string;
}
