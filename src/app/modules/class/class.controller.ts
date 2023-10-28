import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ClassService } from './class.service';

const create = catchAsync(async (req, res) => {
  const result = await ClassService.create(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Successfully create class',
    success: true,
    data: result,
  });
});

export const ClassController = {
  create,
};
