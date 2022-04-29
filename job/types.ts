export interface Job {
  id: string;
  title: string;
  company: string;
  description?: string;
  image?: string;
  rate?: string;
  tags: string[];
  link: string;
  featured: boolean;
  createdAt: number;
  expiredAt: number;
  seniority: string[];
}
