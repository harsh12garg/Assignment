
export interface BasicDetails {
  name: string;
  email: string;
  mobile: string;
  dateOfBirth: string;
}

export interface DocumentCollection {
  class10: string | null;
  class12: string | null;
  graduation: string | null;
  postGraduation: string | null;
  resume: string | null;
  recommendationLetter: string | null;
  salarySlips: string | null;
  others: string | null;
}

export interface StatementOfPurpose {
  question1: string;
  question2: string;
  question3: string;
}

export interface InterviewAvailability {
  email: string;
  location: string;
  date: string;
  time: string;
  timezone: string;
  medium: string;
}

export interface FormData {
  basic: BasicDetails;
  documents: DocumentCollection;
  statement: StatementOfPurpose;
  interview: InterviewAvailability;
}

export type FormStep = 'basic' | 'documents' | 'statement' | 'interview';
