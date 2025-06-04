declare global {
  export type UserType = {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt?: Date;
    accessToken: string;
  };

  export type SigninType = {
    name: string;
    email: string;
  };

  export type Signup = {
    name: string;
    email: string;
    password: string;
  };
}

export {};
