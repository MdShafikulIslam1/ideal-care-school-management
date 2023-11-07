import { ExamType } from '@prisma/client';
import { z } from 'zod';

const createSubjectMarkZodSchema = z.object({
  body: z.object({
    marksData: z.array(
      z.object({
        classId: z.string().min(1, { message: 'classId is required' }),
        studentId: z.string().min(1, { message: 'studentId is required' }),
        subjectId: z.string().min(1, { message: 'subjectId is required' }),
        examType: z.enum(Object.values(ExamType) as [string, ...string[]], {
          required_error: 'examType must be a valid ExamType value',
        }),
        marks: z.number().int().min(0, {
          message: 'marks is required and must be a non-negative integer',
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
