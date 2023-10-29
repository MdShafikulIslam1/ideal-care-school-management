import httpStatus from 'http-status';
import ApiError from '../../../error/ApiError';
import { IChangePassword, ILoginUser } from './auth.interface';
import config from '../../../config';
import { JwtHelpers } from '../../../helpers/jwtHelpes';
import prisma from '../../../shared/prisma';
import { JwtPayload, Secret } from 'jsonwebtoken';
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

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;

  const isUserExist = await prisma.user.findFirst({
    where: {
      id: user?.userId,
    },
    include: {
      student: true,
      teacher: true,
      admin: true,
      guardian: true,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // // checking old password
  if (
    isUserExist.password &&
    !(await bcrypt.compare(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Password in incorrect');
  }

  // hash password before saving
  const newHashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_number)
  );

  await prisma.user.update({
    where: {
      id: isUserExist.id,
    },
    data: {
      isPasswordChange: true,
      password: newHashedPassword,
      passwordChangeDate: new Date(),
    },
  });
};

export const AuthService = {
  loginUser,
  changePassword,
};
