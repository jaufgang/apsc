import { JobCategory } from './job.types';

export interface JobType {
  title: string;
  category: JobCategory;
  description: string;
}

export interface Boat {
  name: string;
}

export interface Member {
  status: string;
  membershipNumber: string;
  firstName: string;
  lastName: string;
}
export interface AppData {
  types: JobType[];
  members: Member[];
  boats: Boat[];
}
