import { Student, User, User_Role } from '@prisma/client';
import config from '../../../config';
import { generateStudentId } from './user.utils';
import prisma from '../../../shared/prisma';
import ApiError from '../../../error/ApiError';
import httpStatus from 'http-status';

const createStudent = async (student: Student, user: User): Promise<User> => {
  // If password is not given,set default password
  if (!user.password) {
    user.password = config.default_pass as string;
  }
  // set role
  user.role = User_Role.STUDENT;

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
    return newUser;
  });
  return result;
};

// const createFaculty = async (
//   faculty: IFaculty,
//   user: IUser
// ): Promise<IUser | null> => {
//   // If password is not given,set default password
//   if (!user.password) {
//     user.password = config.default_faculty_pass as string;
//   }

//   // set role
//   user.role = 'faculty';

//   let newUserAllData = null;
//   const session = await mongoose.startSession();
//   try {
//     session.startTransaction();
//     // generate faculty id
//     const id = await generateFacultyId();
//     // set custom id into both  faculty & user
//     user.id = id;
//     faculty.id = id;
//     // Create faculty using sesssin
//     const newFaculty = await Faculty.create([faculty], { session });

//     if (!newFaculty.length) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty ');
//     }
//     // set faculty _id (reference) into user.student
//     user.faculty = newFaculty[0]._id;

//     const newUser = await User.create([user], { session });

//     if (!newUser.length) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
//     }
//     newUserAllData = newUser[0];

//     await session.commitTransaction();
//     await session.endSession();
//   } catch (error) {
//     await session.abortTransaction();
//     await session.endSession();
//     throw error;
//   }

//   if (newUserAllData) {
//     newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
//       path: 'faculty',
//       populate: [
//         {
//           path: 'academicDepartment',
//         },
//         {
//           path: 'academicFaculty',
//         },
//       ],
//     });
//   };

//   if (newUserAllData) {
//     await RedisClient.publish(EVENT_FACULTY_CREATED, JSON.stringify(newUserAllData.faculty));
//   }

//   return newUserAllData;
// };

// const createAdmin = async (
//   admin: IAdmin,
//   user: IUser
// ): Promise<IUser | null> => {
//   // If password is not given,set default password
//   if (!user.password) {
//     user.password = config.default_admin_pass as string;
//   }
//   // set role
//   user.role = 'admin';

//   let newUserAllData = null;
//   const session = await mongoose.startSession();
//   try {
//     session.startTransaction();
//     // generate admin id
//     const id = await generateAdminId();
//     user.id = id;
//     admin.id = id;

//     const newAdmin = await Admin.create([admin], { session });

//     if (!newAdmin.length) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty ');
//     }

//     user.admin = newAdmin[0]._id;

//     const newUser = await User.create([user], { session });

//     if (!newUser.length) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin');
//     }
//     newUserAllData = newUser[0];

//     await session.commitTransaction();
//     await session.endSession();
//   } catch (error) {
//     await session.abortTransaction();
//     await session.endSession();
//     throw error;
//   }

//   if (newUserAllData) {
//     newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
//       path: 'admin',
//       populate: [
//         {
//           path: 'managementDepartment',
//         },
//       ],
//     });
//   }

//   return newUserAllData;
// };

export const UserService = {
  createStudent,
};
