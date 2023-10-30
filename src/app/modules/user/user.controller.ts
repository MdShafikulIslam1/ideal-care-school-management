import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';
import { User } from '@prisma/client';

const createStudent = catchAsync(async (req, res) => {
  const { student, ...userData } = req.body;
  const result = await UserService.createStudent(student, userData);

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created successfully!',
    data: result,
  });
});
const createAdmin = catchAsync(async (req, res) => {
  const { admin, ...userData } = req.body;
  const result = await UserService.createAdmin(admin, userData);

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'admin created successfully!',
    data: result,
  });
});
const createTeacher = catchAsync(async (req, res) => {
  const { teacher, ...userData } = req.body;
  const result = await UserService.createTeacher(teacher, userData);

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'teacher created successfully!',
    data: result,
  });
});
const createGuardian = catchAsync(async (req, res) => {
  const { guardian, ...userData } = req.body;
  const result = await UserService.createGuardian(guardian, userData);
  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Guardian created successfully!',
    data: result,
  });
});
const createSuperAdmin = catchAsync(async (req, res) => {
  const { superAdmin, ...userData } = req.body;
  const result = await UserService.createSuperAdmin(superAdmin, userData);
  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Super admin created successfully!',
    data: result,
  });
});

export const UserController = {
  createStudent,
  createAdmin,
  createTeacher,
  createGuardian,
  createSuperAdmin,
};
