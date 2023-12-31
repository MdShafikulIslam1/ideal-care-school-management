import {
  Admin,
  Guardian,
  Student,
  SuperAdmin,
  Teacher,
  User,
  User_Role,
} from '@prisma/client';
import config from '../../../config';
import {
  generateAdminId,
  generateStudentId,
  generateSuperAdminId,
  generateTeacherId,
} from './user.utils';
import prisma from '../../../shared/prisma';
import ApiError from '../../../error/ApiError';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';

const createStudent = async (student: Student, user: User): Promise<User> => {
  const { classId } = student;
  const isExistClass = await prisma.class.findUnique({
    where: {
      id: classId,
    },
  });
  if (
    !isExistClass ||
    isExistClass?.admittedStudent === isExistClass?.maxCapacity
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid class Name');
  }
  // If password is not given,set default password
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_number)
  );

  if (!user.password) {
    user.password = await bcrypt.hash(
      config.default_pass as string,
      Number(config.bcrypt_salt_number)
    );
    config.default_pass as string;
  }
  // set role
  user.role = User_Role.student;

  const result = await prisma.$transaction(async ts => {
    const id = await generateStudentId();
    // set custom id into both  student & user
    user.id = id;
    student.id = id;
    const newStudent = await ts.student.create({
      data: student,
    });

    if (!newStudent) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }
    user.studentId = newStudent?.id;
    const newUser = await ts.user.create({
      data: user,
      include: {
        student: true,
      },
    });
    await ts.class.update({
      where: {
        id: classId,
      },
      data: {
        admittedStudent: {
          increment: 1,
        },
      },
    });
    return newUser;
  });
  return result;
};
const createSuperAdmin = async (
  superAdmin: SuperAdmin,
  user: User
): Promise<User> => {
  // If password is not given,set default password
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_number)
  );

  if (!user.password) {
    user.password = await bcrypt.hash(
      config.default_pass as string,
      Number(config.bcrypt_salt_number)
    );
    config.default_pass as string;
  }
  // set role
  user.role = User_Role.super_admin;

  const result = await prisma.$transaction(async ts => {
    const id = await generateSuperAdminId();
    // set custom id into both  student & user
    user.id = id;
    superAdmin.id = id;
    const newAdmin = await ts.superAdmin.create({
      data: superAdmin,
    });

    if (!newAdmin) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Failed to create Super Admin'
      );
    }
    user.superAdminId = newAdmin?.id;
    const newUser = await ts.user.create({
      data: user,
      include: {
        superAdmin: true,
      },
    });
    return newUser;
  });
  return result;
};
const createAdmin = async (admin: Admin, user: User): Promise<User> => {
  // If password is not given,set default password
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_number)
  );

  if (!user.password) {
    user.password = await bcrypt.hash(
      config.default_pass as string,
      Number(config.bcrypt_salt_number)
    );
    config.default_pass as string;
  }
  // set role
  user.role = User_Role.admin;

  const result = await prisma.$transaction(async ts => {
    const id = await generateAdminId();
    // set custom id into both  student & user
    user.id = id;
    admin.id = id;
    const newAdmin = await ts.admin.create({
      data: admin,
    });

    if (!newAdmin) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }
    user.adminId = newAdmin?.id;
    const newUser = await ts.user.create({
      data: user,
      include: {
        admin: true,
      },
    });
    return newUser;
  });
  return result;
};
const createTeacher = async (teacher: Teacher, user: User): Promise<User> => {
  // If password is not given,set default password
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_number)
  );

  if (!user.password) {
    user.password = await bcrypt.hash(
      config.default_pass as string,
      Number(config.bcrypt_salt_number)
    );
    config.default_pass as string;
  }
  // set role
  user.role = User_Role.teacher;

  const result = await prisma.$transaction(async ts => {
    const id = await generateTeacherId();
    // set custom id into both  student & user
    user.id = id;
    teacher.id = id;
    const newTeacher = await ts.teacher.create({
      data: teacher,
    });

    if (!newTeacher) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Teacher');
    }
    user.teacherId = newTeacher?.id;
    const newUser = await ts.user.create({
      data: user,
      include: {
        teacher: true,
      },
    });
    return newUser;
  });
  return result;
};
const createGuardian = async (params: Guardian, user: User): Promise<User> => {
  const { childId, childPassword, phoneNumber } = params;
  params.password = await bcrypt.hash(
    params.password,
    Number(config.bcrypt_salt_number)
  );
  user.password = params.password;
  user.role = User_Role.guardian;
  const isExistStudent = await prisma.user.findFirst({
    where: {
      student: {
        id: childId,
      },
    },
  });
  if (!isExistStudent) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Child id is not valid');
  }
  if (isExistStudent?.password !== childPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Child password is not correct');
  }
  const result = await prisma.$transaction(async ts => {
    const newGuardian = await ts.guardian.create({
      data: params,
    });
    user.id = newGuardian.phoneNumber;
    user.guardianId = phoneNumber;
    const newUser = await ts.user.create({
      data: user,
      include: {
        guardian: {
          include: {
            child: true,
          },
        },
      },
    });
    return newUser;
  });
  return result;
};

export const UserService = {
  createStudent,
  createSuperAdmin,
  createAdmin,
  createTeacher,
  createGuardian,
};
