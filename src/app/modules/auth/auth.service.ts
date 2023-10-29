import httpStatus from 'http-status';
import ApiError from '../../../error/ApiError';
import { ILoginUser } from './auth.interface';
import config from '../../../config';
import { JwtHelpers } from '../../../helpers/jwtHelpes';
import prisma from '../../../shared/prisma';
import { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const loginUser = async (payload: ILoginUser) => {
  const { id, password } = payload;
  const isUserExist = await prisma.user.findFirst({
    where: {
      id,
    },
  });
  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist');
  }
  if (
    isUserExist.password &&
    !(await bcrypt.compare(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password in incorrect');
  }
  const { id: userId, role, isPasswordChange } = isUserExist;
  const accessToken = JwtHelpers.createToken(
    { userId, role },
    config.jwt.secret_key as Secret,
    config.jwt.expires_in_secret_key as string
  );
  return {
    accessToken,
    isPasswordChange,
  };
};

export const AuthService = {
  loginUser,
};
