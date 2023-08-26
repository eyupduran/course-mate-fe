export interface CourseDetailModel{
    userId: number,
    courseId: number,
    teacherInfo: string,
    courseName: string,
    courseFee: string,
    courseDetail: string,
    startDate: string
    endDate: string,
    quota: number,
    studentCount?:number
}