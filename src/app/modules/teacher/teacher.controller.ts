import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { TeacherService } from './teacher.service';
import { paginationOptionFields } from '../../../common/paginationOptions';
import pick from '../../../shared/pick';
import { teacherFilterableFields } from './teacher.constant';

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, teacherFilterableFields);
  const paginationOptions = pick(req.query, paginationOptionFields);
  const result = await TeacherService.getAll(filters, paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Get all Teachers',
    data: result.data,
    meta: result.meta,
  });
});

const getSingle = catchAsync(async (req, res) => {
  const result = await TeacherService.getSingle(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Get a Teacher',
    data: result,
  });
});
const deleteOne = catchAsync(async (req, res) => {
  const result = await TeacherService.deleteOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Delete a Teacher',
    data: result,
  });
});
const updateOne = catchAsync(async (req, res) => {
  const result = await TeacherService.updateOne(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Update a Teacher',
    data: result,
  });
});
const assignSubjects = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TeacherService.assignSubjects(id, req.body.subjects);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Subject Teacher assigned successfully',
    data: result,
  });
});
const removeSubjects = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TeacherService.removeSubjects(id, req.body.subjects);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Subject Teacher removes successfully',
    data: result,
  });
});
export const TeacherController = {
  getAll,
  getSingle,
  deleteOne,
  updateOne,
  assignSubjects,
  removeSubjects,
};
