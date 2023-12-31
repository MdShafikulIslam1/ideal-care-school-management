/* eslint-disable @typescript-eslint/no-explicit-any */
export const getGradeFromMarks = (marks: number) => {
  let result = {
    grade: '',
    point: 0,
  };
  if (marks >= 0 && marks < 33) {
    result = {
      grade: 'F',
      point: 0,
    };
  } else if (marks >= 33 && marks <= 39) {
    result = {
      grade: 'D',
      point: 2.0,
    };
  } else if (marks >= 40 && marks <= 49) {
    result = {
      grade: 'C',
      point: 2.5,
    };
  } else if (marks >= 50 && marks <= 59) {
    result = {
      grade: 'B',
      point: 3.0,
    };
  } else if (marks >= 60 && marks <= 69) {
    result = {
      grade: 'A-',
      point: 3.5,
    };
  } else if (marks >= 70 && marks <= 79) {
    result = {
      grade: 'A',
      point: 4.0,
    };
  } else if (marks >= 80 && marks <= 100) {
    result = {
      grade: 'A+',
      point: 5.0,
    };
  }

  return result;
};

export const getGradeFromPoint = (point: number) => {
  let result = '';

  if (point < 2.0) {
    result = 'F';
  } else if (point >= 2.0 && point < 2.5) {
    result = 'D';
  } else if (point >= 2.5 && point < 3.0) {
    result = 'C';
  } else if (point >= 3.0 && point < 3.5) {
    result = 'B';
  } else if (point >= 3.5 && point < 4.0) {
    result = 'A-';
  } else if (point >= 4.0 && point < 5.0) {
    result = 'A';
  } else if (point >= 5.0) {
    result = 'A+';
  }

  return result;
};

export const groupByClassStudentExamType = (data: any) => {
  const groupData = data.reduce((result: any, item: any) => {
    const { classId, studentId, examType } = item;
    const existingGroup = result.find(
      (group: any) =>
        group.classId === classId &&
        group.studentId === studentId &&
        group.examType === examType
    );

    if (existingGroup) {
      existingGroup.results.push(item);
    } else {
      result.push({
        classId,
        studentId,
        examType,
        results: [item],
      });
    }

    return result;
  }, []);

  return groupData;
};

// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export const groupByClassStudentExamType = async () => {
//   const groupedData = await prisma.subjectMark.groupBy({
//     by: ['classId', 'studentId', 'examType'],
//   });

//   return groupedData;
// };
