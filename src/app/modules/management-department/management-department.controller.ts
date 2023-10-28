import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ManagementDepartmentService } from './management-department.service';

const create = catchAsync(async (req, res) => {
  const result = await ManagementDepartmentService.create(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Successfully create ManagementDepartment',
    success: true,
    data: result,
  });
});

export const ManagementDepartmentController = {
  create,
};
