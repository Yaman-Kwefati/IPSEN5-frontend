// This is the actual response from the backend when requesting a user

export interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  role: Role;
  phoneNumber: string;
}

export enum Role {
  USER,
  ADMIN,
}
