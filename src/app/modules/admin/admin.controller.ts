import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AdminService } from './admin.service';
import { paginationOptionFields } from '../../../common/paginationOptions';
import pick from '../../../shared/pick';
import { adminFilterableFields } from './admin.constant';

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, adminFilterableFields);
  const paginationOptions = pick(req.query, paginationOptionFields);
  const result = await AdminService.getAll(filters, paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Get all Admins',
    data: result.data,
    meta: result.meta,
  });
});

const getSingle = catchAsync(async (req, res) => {
  const result = await AdminService.getSingle(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Get a Admin',
    data: result,
  });
});
const deleteOne = catchAsync(async (req, res) => {
  const result = await AdminService.deleteOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Delete a Admin',
    data: result,
  });
});
const updateOne = catchAsync(async (req, res) => {
  const result = await AdminService.updateOne(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Update a Admin',
    data: result,
  });
});
export const AdminController = {
  getAll,
  getSingle,
  deleteOne,
  updateOne,
};
