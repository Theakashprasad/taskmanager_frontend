
export interface Iuser{
    id: string;
    _id: any;
    fullname: string;
    email: string;
    profilePic: string;
  }
  export interface ITask {
    createdAt: string | number | Date;
    _id: string;
    isCompleted: boolean;
    title: string;
    userId: string;
    description: string;
  }
