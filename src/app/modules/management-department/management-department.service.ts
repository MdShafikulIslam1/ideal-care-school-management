import { ManagementDepartment } from '@prisma/client';
import prisma from '../../../shared/prisma';

const create = async (
  title: ManagementDepartment
): Promise<ManagementDepartment> => {
  const result = await prisma.managementDepartment.create({
    data: title,
  });
  return result;
};

export const ManagementDepartmentService = {
  create,
};
