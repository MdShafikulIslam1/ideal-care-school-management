import { Prisma, Subject } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/paginationOptions';
import prisma from '../../../shared/prisma';

import httpStatus from 'http-status';
import ApiError from '../../../error/ApiError';
import {
  subjectSearchableFields,
  subjectTitleCodeMapper,
} from './subject.constant';
import { ISubjectFilters } from './subject.interface';

const create = async (payload: Subject): Promise<Subject> => {
  if (subjectTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Subject Code');
  }
  const result = await prisma.subject.create({
    data: payload,
  });
  return result;
};

const getAll = async (
  filters: ISubjectFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Subject[]>> => {
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
      OR: subjectSearchableFields.map(field => ({
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
  const whereConditions: Prisma.SubjectWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.subject.findMany({
    where: whereConditions,
    orderBy,
    skip,
    take: limit,
    include: {
      class: true,
    } as Prisma.SubjectInclude,
  });
  const total = await prisma.subject.count({
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

const getSingle = async (id: string): Promise<Subject | null> => {
  const result = await prisma.subject.findUnique({
    where: {
      id,
    },
  });
  return result;
};
const deleteOne = async (id: string): Promise<Subject | null> => {
  const isExistUser = await prisma.subject.findUnique({
    where: {
      id,
    },
  });
  if (!isExistUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'subject does not exist');
  }
  const result = await prisma.subject.delete({
    where: {
      id,
    },
  });

  return result;
};
const updateOne = async (
  id: string,
  data: Partial<Subject>
): Promise<Subject | null> => {
  if (
    data.title &&
    data.code &&
    subjectTitleCodeMapper[data.title] !== data.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Subject Code');
  }

  const result = await prisma.subject.update({
    where: {
      id,
    },
    data,
  });
  return result;
};
export const SubjectService = {
  create,
  getAll,
  getSingle,
  deleteOne,
  updateOne,
};
