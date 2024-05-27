export class User {
  private _id?: string;
  private _userName: string;
  private _password?: string;
  private _lastName: string;
  private _firstName: string;
  private _phoneNumber: string;
  private _role: Role;

  constructor(userName: string, lastName: string, firstName: string, phoneNumber: string, role: Role,
              id?: string, password?: string) {
    this._id = id;
    this._userName = userName;
    this._lastName = lastName;
    this._firstName = firstName;
    this._phoneNumber = phoneNumber;
    this._role = role;
    this._password = password;
  }

  get id(): string | undefined {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get userName(): string {
    return this._userName;
  }

  set userName(value: string) {
    this._userName = value;
  }

  get password(): string | undefined{
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  set phoneNumber(value: string) {
    this._phoneNumber = value;
  }

  get role(): Role {
    return this._role;
  }

  set role(value: Role) {
    this._role = value;
  }
}

export enum Role {
  USER,
  ADMIN,
}
