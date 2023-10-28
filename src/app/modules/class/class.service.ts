import { Class } from '@prisma/client';
import prisma from '../../../shared/prisma';

const create = async (title: Class): Promise<Class> => {
  const result = await prisma.class.create({
    data: title,
  });
  return result;
};

export const ClassService = {
  create,
};
