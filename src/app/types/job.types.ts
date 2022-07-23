import { UserInfo } from './auth.types';
import { Member } from './appData.types';

export enum JobCategory {
  dutyOfficer = 'Duty Officer',
  houseAndGrounds = 'House & Grounds',
  harbour = 'Harbor',
  social = 'Social',
  race = 'Race',
  fleetProgram = 'Fleet Program',
  safety = 'Safety',
  other = 'Special Request / Other',
  shuttleDriver = 'Shuttle Driver',
}
export const jobCategoryOptions = Object.values(JobCategory);

// Basic info for all jobs, either posted on the Job board or member initiated
export interface JobDetails {
  category: JobCategory;
  description: string;
  date: string;
  hours: number;
}
// Jobs on the job board also require a title
export interface PostedJobDetails extends JobDetails {
  title: string;
}

// Volunteers signing up for job board jobs need to include contact info
// so they can be contacted in case of problems
export interface MemberWithContactInfo extends Member {
  contactPhone: string;
}

// Jobs to be posted on the Job Board
export interface JobBoardJob {
  jobDetails: PostedJobDetails;
  showOnJobBoard: true;
  submittedBy: null;
}

export interface SignedUpJobBoardJob {
  jobDetails: PostedJobDetails;
  showOnJobBoard: true;
  submittedBy: UserInfo;
  volunteer: MemberWithContactInfo;
}

// User initiated jobs just need basic job and volunteer info
export interface UserInitiatedJob {
  jobDetails: JobDetails;
  volunteer: Member;
  submittedBy: UserInfo;
  showOnJobBoard: false;
}

export type Job = JobBoardJob | SignedUpJobBoardJob | UserInitiatedJob;
