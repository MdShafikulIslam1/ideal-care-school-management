import { Admin, Student, User, User_Role } from '@prisma/client';
import config from '../../../config';
import { generateAdminId, generateStudentId } from './user.utils';
import prisma from '../../../shared/prisma';
import ApiError from '../../../error/ApiError';
import httpStatus from 'http-status';

const createStudent = async (student: Student, user: User): Promise<User> => {
  // If password is not given,set default password
  if (!user.password) {
    user.password = config.default_pass as string;
  }
  // set role
  user.role = User_Role.STUDENT;

  const result = await prisma.$transaction(async ts => {
    const id = await generateStudentId();
    // set custom id into both  student & user
    user.id = id;
    student.id = id;
    const newStudent = await ts.student.create({
      data: student,
    });

    if (!newStudent) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }
    user.studentId = newStudent?.id;
    const newUser = await ts.user.create({
      data: user,
      include: {
        student: true,
      },
    });
    return newUser;
  });
  return result;
};
const createAdmin = async (admin: Admin, user: User): Promise<User> => {
  // If password is not given,set default password
  if (!user.password) {
    user.password = config.default_pass as string;
  }
  // set role
  user.role = User_Role.ADMIN;

  const result = await prisma.$transaction(async ts => {
    const id = await generateAdminId();
    console.log('admin id', id);
    // set custom id into both  student & user
    user.id = id;
    admin.id = id;
    const newAdmin = await ts.admin.create({
      data: admin,
    });

    if (!newAdmin) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }
    user.adminId = newAdmin?.id;
    const newUser = await ts.user.create({
      data: user,
      include: {
        admin: true,
      },
    });
    return newUser;
  });
  return result;
};

export const UserService = {
  createStudent,
  createAdmin,
};
