import { Class, Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IClassFilterableFields } from './class.interface';
import { IPaginationOptions } from '../../../interfaces/paginationOptions';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { classSearchableFields } from './class.constant';

const create = async (title: Class): Promise<Class> => {
  const result = await prisma.class.create({
    data: title,
  });
  return result;
};
const getAll = async (
  filters: IClassFilterableFields,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Class[]>> => {
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
      OR: classSearchableFields.map(field => ({
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
  const whereConditions: Prisma.ClassWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.class.findMany({
    where: whereConditions,
    orderBy,
    skip,
    take: limit,
  });
  const total = await prisma.class.count({
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

const getSingle = async (id: string): Promise<Class | null> => {
  const result = await prisma.class.findUnique({
    where: {
      id,
    },
  });
  return result;
};
const deleteOne = async (id: string): Promise<Class | null> => {
  const result = await prisma.class.delete({
    where: {
      id,
    },
  });

  return result;
};
const updateOne = async (
  id: string,
  data: Partial<Class>
): Promise<Class | null> => {
  const result = await prisma.class.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

export const ClassService = {
  create,
  getAll,
  getSingle,
  deleteOne,
  updateOne,
};
