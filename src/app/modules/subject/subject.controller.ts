import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { SubjectService } from './subject.service';
import { paginationOptionFields } from '../../../common/paginationOptions';
import pick from '../../../shared/pick';
import { subjectFilterableFields } from './subject.constant';

const create = catchAsync(async (req, res) => {
  const result = await SubjectService.create(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Successfully create Subject',
    success: true,
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, subjectFilterableFields);
  const paginationOptions = pick(req.query, paginationOptionFields);
  const result = await SubjectService.getAll(filters, paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Get all Subjects',
    data: result.data,
    meta: result.meta,
  });
});

const getSingle = catchAsync(async (req, res) => {
  const result = await SubjectService.getSingle(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Get a Subject',
    data: result,
  });
});
const deleteOne = catchAsync(async (req, res) => {
  const result = await SubjectService.deleteOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Delete a Subject',
    data: result,
  });
});
const updateOne = catchAsync(async (req, res) => {
  const result = await SubjectService.updateOne(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Update a Subject',
    data: result,
  });
});
export const SubjectController = {
  create,
  getAll,
  getSingle,
  deleteOne,
  updateOne,
};
