import { z } from 'zod';
import { subjectCodes, subjectTitles } from './subject.constant';

const createSubjectZodSchema = z.object({
  body: z.object({
    title: z.enum([...subjectTitles] as [string, ...string[]], {
      required_error: 'Title is required',
    }),
    code: z.enum([...subjectCodes] as [string, ...string[]], {
      required_error: 'code is required',
    }),
    classId: z.string({ required_error: 'classId is required' }),
  }),
});

const updateSubjectZodSchema = z
  .object({
    body: z.object({
      title: z.enum([...subjectTitles] as [string, ...string[]]).optional(),

      code: z.enum([...subjectCodes] as [string, ...string[]]).optional(),
      classId: z.string().optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either both title and code should be provided or neither',
    }
  );

export const SubjectValidation = {
  createSubjectZodSchema,
  updateSubjectZodSchema,
};
