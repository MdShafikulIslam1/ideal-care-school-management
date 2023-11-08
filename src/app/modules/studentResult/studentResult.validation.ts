import { ExamType } from '@prisma/client';
import { z } from 'zod';

const createSubjectMarkZodSchema = z.object({
  body: z.object({
    classId: z.string({ required_error: 'classId is required' }),
    studentId: z.string({ required_error: 'studentId is required' }),
    examType: z.enum(Object.values(ExamType) as [string, ...string[]], {
      required_error: 'examType must be a valid ExamType value',
    }),
    marksData: z.array(
      z.object({
        subjectId: z.string().min(1, { message: 'subjectId is required' }),
        fullMark: z.number().int().min(0, {
          message: 'fullMark is required and must be a non-negative integer',
        }),
        obtainMark: z.number().int().min(0, {
          message: 'obtainMark is required and must be a non-negative integer',
        }),
      })
    ),
  }),
});

// const updateSubjectMarkZodSchema = z
//   .object({
//     body: z.object({
//       title: z.enum([...subjectTitles] as [string, ...string[]]).optional(),

//       code: z.enum([...subjectCodes] as [string, ...string[]]).optional(),
//       classId: z.string().optional(),
//     }),
//   })
//   .refine(
//     data =>
//       (data.body.title && data.body.code) ||
//       (!data.body.title && !data.body.code),
//     {
//       message: 'Either both title and code should be provided or neither',
//     }
//   );

export const SubjectMarkValidation = {
  createSubjectMarkZodSchema,
  // updateSubjectMarkZodSchema,
};
