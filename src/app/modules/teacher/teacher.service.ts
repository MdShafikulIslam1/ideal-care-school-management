import { Prisma, SubjectTeacher, Teacher, User } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/paginationOptions';
import prisma from '../../../shared/prisma';

import httpStatus from 'http-status';
import ApiError from '../../../error/ApiError';
import { ITeacherFilterableFields } from './teacher.interface';
import { teacherSearchableFields } from './teacher.constant';

const getAll = async (
  filters: ITeacherFilterableFields,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Teacher[]>> => {
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
      OR: teacherSearchableFields.map(field => ({
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
  const whereConditions: Prisma.TeacherWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.teacher.findMany({
    where: whereConditions,
    orderBy,
    skip,
    take: limit,
    include: {
      class: true,
      user: true,
    } as Prisma.TeacherInclude,
  });
  const total = await prisma.teacher.count({
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

const getSingle = async (id: string): Promise<Teacher | null> => {
  const result = await prisma.teacher.findUnique({
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
    await ts.teacher.delete({
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
  data: Partial<Teacher>
): Promise<Teacher | null> => {
  const result = await prisma.teacher.update({
    where: {
      id,
    },
    data,
  });
  return result;
};
const assignSubjects = async (
  id: string,
  payload: string[]
): Promise<SubjectTeacher[]> => {
  await prisma.subjectTeacher.createMany({
    data: payload.map(subjectId => ({
      teacherId: id,
      subjectId: subjectId,
    })),
  });

  const assignCoursesData = await prisma.subjectTeacher.findMany({
    where: {
      teacherId: id,
    },
    include: {
      subject: true,
    },
  });

  return assignCoursesData;
};
const removeSubjects = async (
  id: string,
  payload: string[]
): Promise<SubjectTeacher[]> => {
  await prisma.subjectTeacher.deleteMany({
    where: {
      teacherId: id,
      subjectId: {
        in: payload,
      },
    },
  });

  const assignCoursesData = await prisma.subjectTeacher.findMany({
    where: {
      teacherId: id,
    },
    include: {
      subject: true,
    },
  });

  return assignCoursesData;
};
export const TeacherService = {
  getAll,
  getSingle,
  deleteOne,
  updateOne,
  assignSubjects,
  removeSubjects,
};
