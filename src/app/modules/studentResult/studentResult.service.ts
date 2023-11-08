/* eslint-disable @typescript-eslint/no-explicit-any */

import prisma from '../../../shared/prisma';
import { getGradeFromMarks, getGradeFromPoint } from './studentResult.utils';
import { ISubjectMarkFilters } from './studentResult.interface';
import { IPaginationOptions } from '../../../interfaces/paginationOptions';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { subjectMarkSearchableFields } from './studentResult.constant';

const create = async (payload: any): Promise<any> => {
  const { marksData, classId, studentId, examType, year } = payload;

  const existingSubjectMark = await prisma.studentResult.findFirst({
    where: {
      classId,
      studentId,
      examType,
    },
  });

  for (const data of marksData) {
    const subjectId = data?.subjectId;
    if (existingSubjectMark && subjectId) {
      throw new Error(
        'Result already exists for the given class, student, exam type, and subject.'
      );
    }
  }

  const createStudentResult = await prisma.$transaction(async ts => {
    const result1 = await ts.studentResult.create({
      data: {
        classId,
        studentId,
        examType,
        year,
      },
    });
    const resultData = marksData.map((mark: any) => ({
      subjectId: mark?.subjectId,
      fullMark: mark?.fullMark,
      obtainMark: mark?.obtainMark,
      grade: getGradeFromMarks(mark?.obtainMark as number).grade,
      point: getGradeFromMarks(mark?.obtainMark as number).point,
      studentResultId: result1.id,
    }));
    await ts.subjectMarks.createMany({
      data: resultData,
    });
    const getCreatedResultData = await ts.studentResult.findFirst({
      where: {
        classId,
        studentId,
        examType,
      },
      include: {
        class: true,
        student: true,
        subjectMarks: {
          include: {
            subject: true,
          },
        },
      },
    });
    return getCreatedResultData;
  });

  return createStudentResult;
};

const getAll = async (
  filters: ISubjectMarkFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Record<string, unknown>[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  // sorting
  let orderBy = {};
  if (sortBy && sortOrder) {
    orderBy = {
      [sortBy]: sortOrder,
    };
  }
  const andConditions = [];

  // searching;
  if (searchTerm) {
    andConditions.push({
      OR: subjectMarkSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  //filtering
  if (filtersData) {
    const filterKeys = Object.keys(filtersData) as (keyof typeof filtersData)[];
    filterKeys.forEach(key => {
      if (filtersData[key]) {
        const filter: Record<string, unknown> = {};
        filter[key] = { equals: filtersData[key] };
        andConditions.push(filter);
      }
    });
  }
  const whereConditions =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.studentResult.findMany({
    where: whereConditions,
    orderBy,
    skip,
    take: limit,
    include: {
      class: true,
      student: true,
      subjectMarks: {
        include: {
          subject: true,
        },
      },
    },
  });

  const updatedResults = result.map(item => {
    const subjectMarks = item.subjectMarks;
    let totalFullMarks = 0;
    let totalObtainMarks = 0;
    let totalPoints = 0;

    const hasFailedSubject = subjectMarks.some(
      subjectMark => subjectMark.obtainMark < 33
    );
    subjectMarks.forEach(subjectMark => {
      totalFullMarks += subjectMark.fullMark ?? 0;
      totalObtainMarks += subjectMark.obtainMark ?? 0;
      totalPoints += subjectMark.point ?? 0;
    });

    if (hasFailedSubject) {
      // If the student has failed in any subject, set totalPoints to 0
      totalPoints = 0;
    }

    // Calculate the grade based on total points
    const grade = getGradeFromPoint(totalPoints / subjectMarks.length);
    let point = totalPoints / subjectMarks.length;
    if (
      point !== 5 &&
      point !== 4.5 &&
      point !== 4 &&
      point !== 3 &&
      point !== 2.5 &&
      point !== 2 &&
      point !== 0
    ) {
      point = parseInt(point.toFixed(2));
    }

    return {
      ...item,
      shortResult: {
        totalFullMarks,
        totalObtainMarks,
        point,
        grade,
      },
    };
  });

  const total = await prisma.studentResult.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: updatedResults,
  };
};

export const StudentResultService = {
  create,
  getAll,
};
