import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StudentService } from './student.service';
import { paginationOptionFields } from '../../../common/paginationOptions';
import pick from '../../../shared/pick';
import { studentFilterableFields } from './student.constant';

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, studentFilterableFields);
  const paginationOptions = pick(req.query, paginationOptionFields);
  const result = await StudentService.getAll(filters, paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Get all Students',
    data: result.data,
    meta: result.meta,
  });
});

const getSingle = catchAsync(async (req, res) => {
  const result = await StudentService.getSingle(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Get a Student',
    data: result,
  });
});
const deleteOne = catchAsync(async (req, res) => {
  const result = await StudentService.deleteOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Delete a Student',
    data: result,
  });
});
const updateOne = catchAsync(async (req, res) => {
  const result = await StudentService.updateOne(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Update a Student',
    data: result,
  });
});
export const StudentController = {
  getAll,
  getSingle,
  deleteOne,
  updateOne,
};
