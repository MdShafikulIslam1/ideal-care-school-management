import { z } from 'zod';

const create = z.object({
  body: z.object({
    studentId: z.string({
      required_error: 'Student ID is required',
    }),
    firstName: z.string({
      required_error: 'First Name is required',
    }),
    lastName: z.string({
      required_error: 'Last Name is required',
    }),
    middleName: z.string({
      required_error: 'Middle Name is required',
    }),
    dateOfBirth: z.string({
      required_error: 'Date of Birth is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    profileImage: z.string({
      required_error: 'Profile Image is required',
    }),
    contactNo: z.string({
      required_error: 'Contact Number is required',
    }),
    gender: z.string({
      required_error: 'Gender is required',
    }),
    academicFacultyId: z.string({
      required_error: 'Academic Faculty ID is required',
    }),
    academicDepartmentId: z.string({
      required_error: 'Academic Department ID is required',
    }),
    academicSemesterId: z.string({
      required_error: 'Academic Semester ID is required',
    }),
  }),
});
export const StudentZodSchema = {
  create,
};
