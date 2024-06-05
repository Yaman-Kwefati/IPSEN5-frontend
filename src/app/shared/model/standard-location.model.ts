import {Wing} from "./wing.model";
import {User} from "./user.model";

export class StandardLocation {
  private _id: string;
  private _wing: Wing;
  private _user: User;

  constructor(id: string, wing: Wing, user: User) {
    this._id = id;
    this._wing = wing;
    this._user = user;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get wing(): Wing {
    return this._wing;
  }

  set wing(value: Wing) {
    this._wing = value;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }
}
