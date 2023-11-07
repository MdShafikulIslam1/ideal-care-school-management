import { Prisma, Student, User, ExamType } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/paginationOptions';
import prisma from '../../../shared/prisma';
import { IStudentFilterableFields } from './student.interface';
import { studentSearchableFields } from './student.constant';
import httpStatus from 'http-status';
import ApiError from '../../../error/ApiError';
import { JwtPayload } from 'jsonwebtoken';
import { getGradeFromPoint } from '../subjectMark/subjectMark.utils';

const getAll = async (
  filters: IStudentFilterableFields,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Student[]>> => {
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
      OR: studentSearchableFields.map(field => ({
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
  const whereConditions: Prisma.StudentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.student.findMany({
    where: whereConditions,
    orderBy,
    skip,
    take: limit,
    include: {
      class: true,
      guardians: true,
      user: true,
    } as Prisma.StudentInclude,
  });
  const total = await prisma.student.count({
    where: whereConditions,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingle = async (id: string): Promise<Student | null> => {
  const result = await prisma.student.findUnique({
    where: {
      id,
    },
  });
  return result;
};
const deleteOne = async (id: string): Promise<User | null> => {
  const isExistUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!isExistUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user does not exist');
  }

  const result = await prisma.$transaction(async ts => {
    await ts.student.delete({
      where: {
        id,
      },
    });
    const deleteUser = await ts.user.delete({
      where: {
        id,
      },
    });
    return deleteUser;
  });

  return result;
};
const updateOne = async (
  id: string,
  data: Partial<Student>
): Promise<Student | null> => {
  const result = await prisma.student.update({
    where: {
      id,
    },
    data,
  });
  return result;
};
const getMyResult = async (
  userId: JwtPayload | null | string,
  query: Record<string, unknown>
) => {
  const isStudentExist = await prisma.user.findFirst({
    where: {
      studentId: userId as string,
    },
    include: {
      student: {
        include: {
          class: true,
        },
      },
    },
  });
  // console.log(isStudentExist);
  if (!isStudentExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'You are not Valid Student');
  }
  const isExistResult = await prisma.subjectMark.findMany({
    where: {
      classId: isStudentExist?.student?.class?.id,
      studentId: isStudentExist?.id,
      examType: query?.examType as ExamType,
    },
  });
  if (isExistResult?.length < 1) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'The result not found');
  }

  const initialTotals = {
    totalFullMarks: 0,
    totalMarks: 0,
    totalPoints: 0,
  };

  const totals = isExistResult.reduce((accumulator, item) => {
    accumulator.totalFullMarks += item.fullMarks ?? 0;
    accumulator.totalMarks += item.marks ?? 0;
    accumulator.totalPoints += item.point ?? 0;
    return accumulator;
  }, initialTotals);

  const result = {
    result: isExistResult,
    totalFullMarks: totals?.totalFullMarks,
    totalObtainMarks: totals?.totalMarks,
    point: totals.totalPoints / isExistResult.length,
    grade: getGradeFromPoint(totals.totalPoints / isExistResult.length),
  };
  return result;
};

export const StudentService = {
  getAll,
  getSingle,
  deleteOne,
  updateOne,
  getMyResult,
};
