import { Admin, Prisma, User } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/paginationOptions';
import prisma from '../../../shared/prisma';

import httpStatus from 'http-status';
import ApiError from '../../../error/ApiError';
import { IAdminFilterableFields } from './admin.interface';
import { adminSearchableFields } from './admin.constant';

const getAll = async (
  filters: IAdminFilterableFields,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Admin[]>> => {
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
      OR: adminSearchableFields.map(field => ({
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
  const whereConditions: Prisma.AdminWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.admin.findMany({
    where: whereConditions,
    orderBy,
    skip,
    take: limit,
    include: {
      managementDepartment: true,
      user: true,
    } as Prisma.AdminInclude,
  });
  const total = await prisma.admin.count({
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

const getSingle = async (id: string): Promise<Admin | null> => {
  const result = await prisma.admin.findUnique({
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
    await ts.admin.delete({
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
  data: Partial<Admin>
): Promise<Admin | null> => {
  const result = await prisma.admin.update({
    where: {
      id,
    },
    data,
  });
  return result;
};
export const AdminService = {
  getAll,
  getSingle,
  deleteOne,
  updateOne,
};
