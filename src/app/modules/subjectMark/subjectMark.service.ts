import { subjectMark } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { SubjectMarkUtils } from './subjectMark.utils';

const createMark = async (payload: subjectMark): Promise<subjectMark> => {
  const { classId, studentId, subjectId, marks, examType } = payload;
  const result = await prisma.subjectMark.create({
    data: {
      classId,
      studentId,
      subjectId,
      marks,
      examType,
      grade: SubjectMarkUtils.getGradeFromMarks(marks as number).grade,
      point: SubjectMarkUtils.getGradeFromMarks(marks as number).point,
    },
  });
  return result;
};
export const SubjectMarkService = {
  createMark,
};
