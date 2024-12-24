
export interface Iuser{
    id: string;
    _id: any;
    fullname: string;
    email: string;
    profilePic: string;
  }
  export interface ITask {
    _id: string;
    isCompleted: boolean;
    title: string;
    userId: string;
    description: string;
  }
