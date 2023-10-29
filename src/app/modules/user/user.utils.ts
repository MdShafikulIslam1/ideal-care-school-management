import { User_Role } from '@prisma/client';
import prisma from '../../../shared/prisma';

export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await prisma.user.findFirst({
    where: {
      role: User_Role.STUDENT,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return lastStudent?.id ? lastStudent.id.substring(2) : undefined;
};

export const generateStudentId = async (): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0'); //00000
  //increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  //20 25
  incrementedId = `S-${incrementedId}`;

  return incrementedId;
};

export const findLastAdminId = async (): Promise<string | undefined> => {
  const lastAdmin = await prisma.user.findFirst({
    where: {
      role: User_Role.ADMIN,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async (): Promise<string> => {
  const currentId =
    (await findLastAdminId()) || (0).toString().padStart(5, '0'); //00000
  //increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  //20 25
  incrementedId = `A-${incrementedId}`;

  return incrementedId;
};
export const findLastTeacherId = async (): Promise<string | undefined> => {
  const lastTeacher = await prisma.user.findFirst({
    where: {
      role: User_Role.TEACHER,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return lastTeacher?.id ? lastTeacher.id.substring(2) : undefined;
};

export const generateTeacherId = async (): Promise<string> => {
  const currentId =
    (await findLastTeacherId()) || (0).toString().padStart(5, '0'); //00000
  //increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  //20 25
  incrementedId = `T-${incrementedId}`;

  return incrementedId;
};
