export interface UserCreateDTO {
  password: string;
  email: string; // This will eventually represent the username field of the User model
  firstName: string;
  lastName: string;
  phoneNumber: string;
}
