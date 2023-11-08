import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StudentResultService } from './studentResult.service';
import pick from '../../../shared/pick';
import { paginationOptionFields } from '../../../common/paginationOptions';
import { subjectMarkFilterableFields } from './studentResult.constant';

const create = catchAsync(async (req, res) => {
  const result = await StudentResultService.create(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Successfully create Subject Mark',
    success: true,
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, subjectMarkFilterableFields);
  const paginationOptions = pick(req.query, paginationOptionFields);
  const result = await StudentResultService.getAll(filters, paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Get all Subjects Marks',
    data: result.data,
    meta: result.meta,
  });
});

export const StudentResultController = {
  create,
  getAll,
};
