import { ISubjectCodes, ISubjectTitles } from './subject.interface';

export const subjectTitles: ISubjectTitles[] = [
  'Chemistry',
  'Physics',
  'Biology',
];

export const subjectCodes: ISubjectCodes[] = ['901', '902', '903'];

export const subjectTitleCodeMapper: {
  [key: string]: string;
} = {
  Chemistry: '901',
  Physics: '902',
  Biology: '903',
};

export const subjectSearchableFields = ['title', 'code', 'classId'];

export const subjectFilterableFields = [
  'searchTerm',
  'title',
  'code',
  'classId',
];
