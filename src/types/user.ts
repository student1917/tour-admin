export interface SharedBlog {
    blog: string;
    sharedAt: string;
    _id: string;
    id: string;
  }
  
  export interface User {
    _id: string;
    email: string;
    emailVerified: boolean;
    role: 'user' | 'admin';
    createdAt: string;
    updatedAt: string;
    photo: string;
    username: string;
  }
  