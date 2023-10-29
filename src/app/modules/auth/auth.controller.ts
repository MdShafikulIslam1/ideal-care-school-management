import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User LoggedIn Successful',
    data: result,
  });
});

export const AuthController = {
  loginUser,
};
