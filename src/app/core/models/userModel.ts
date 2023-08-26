export interface UserModel{
    userId?:number;
    firstName:string;
    lastName:string;
    email:string;
    phoneNumber:string;
    status?:boolean;
    claimName?: string
}
