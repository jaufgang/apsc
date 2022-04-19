import { JobCategory } from './job.types';

export interface JobType {
  title: string;
  category: JobCategory;
  description: string;
}

export interface Boat {
  name: string;
}

export interface AppData {
  types: JobType[];
  boats: Boat[];
}
