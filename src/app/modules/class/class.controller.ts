import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ClassService } from './class.service';
import pick from '../../../shared/pick';
import { classFilterableFields } from './class.constant';
import { paginationOptionFields } from '../../../common/paginationOptions';

const create = catchAsync(async (req, res) => {
  const result = await ClassService.create(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Successfully create class',
    success: true,
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, classFilterableFields);
  const paginationOptions = pick(req.query, paginationOptionFields);
  const result = await ClassService.getAll(filters, paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Get all Class',
    data: result.data,
    meta: result.meta,
  });
});

const getSingle = catchAsync(async (req, res) => {
  const result = await ClassService.getSingle(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Get a Class',
    data: result,
  });
});
const deleteOne = catchAsync(async (req, res) => {
  const result = await ClassService.deleteOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Delete a Class',
    data: result,
  });
});
const updateOne = catchAsync(async (req, res) => {
  const result = await ClassService.updateOne(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Update a Class',
    data: result,
  });
});

export const ClassController = {
  create,
  getAll,
  getSingle,
  deleteOne,
  updateOne,
};
