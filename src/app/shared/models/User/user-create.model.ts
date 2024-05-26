// This is the model being sent to the backend when creating a new user
export interface UserCreateDTO {
  password: string;
  email: string; // This will eventually represent the username field of the User model
  firstName: string;
  lastName: string;
  phoneNumber: string;
}
