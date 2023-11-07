/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';
import {
  getGradeFromMarks,
  getGradeFromPoint,
  groupByClassStudentExamType,
} from './subjectMark.utils';
import { ISubjectMarkFilters } from './subjectMark.interface';
import { IPaginationOptions } from '../../../interfaces/paginationOptions';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { subjectMarkSearchableFields } from './subjectMark.constant';

const create = async (payload: any): Promise<any> => {
  const marksData = payload?.marksData.map((mark: any) => ({
    classId: mark.classId,
    studentId: mark.studentId,
    subjectId: mark.subjectId,
    marks: mark.marks,
    fullMarks: mark?.fullMarks,
    examType: mark.examType,
    grade: getGradeFromMarks(mark.marks as number).grade,
    point: getGradeFromMarks(mark.marks as number).point,
  }));
  const result = await prisma.subjectMark.createMany({
    data: marksData,
  });
  return result;
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

  const result = await prisma.subjectMark.findMany({
    where: whereConditions,
    orderBy,
    skip,
    take: limit,
    include: {
      class: true,
      student: true,
    } as Prisma.subjectMarkInclude,
  });
  const groupedData = groupByClassStudentExamType(result);

  const initialTotals = {
    totalFullMarks: 0,
    totalMarks: 0,
    totalPoints: 0,
  };

  const totals = groupedData[0]?.results?.reduce(
    (accumulator: any, item: any) => {
      accumulator.totalFullMarks += item.fullMarks ?? 0;
      accumulator.totalMarks += item.marks ?? 0;
      accumulator.totalPoints += item.point ?? 0;
      return accumulator;
    },
    initialTotals
  );

  const shortResultInfo = {
    totalFullMarks: totals?.totalFullMarks,
    totalObtainMarks: totals?.totalMarks,
    point: totals.totalPoints / groupedData[0]?.results?.length,
    grade: getGradeFromPoint(
      totals.totalPoints / groupedData[0]?.results?.length
    ),
  };
  groupedData[0].shortResultInfo = shortResultInfo;
  const total = await prisma.subjectMark.count({
    where: whereConditions,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },

    data: groupedData,
  };
};

export const SubjectMarkService = {
  create,
  getAll,
};
