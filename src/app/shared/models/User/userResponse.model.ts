export interface UserResponseModel {
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
