import { UserModel } from "./userModel";

export interface StudentModel extends UserModel{
    studentDetail:string;
    graduationStatus:string
}