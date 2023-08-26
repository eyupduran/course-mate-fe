import { UserModel } from './userModel';

export interface TeacherModel extends UserModel{
    education:string;
    profession:string;
}