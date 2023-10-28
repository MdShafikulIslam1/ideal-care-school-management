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

export const UserController = {
  createStudent,
  createAdmin,
};
