import { ExamType } from '@prisma/client';

export type ISubjectMarkFilters = {
  searchTerm?: string;
  classId?: string;
  subjectId?: string;
  studentId?: string;
  examType?: ExamType;
};
