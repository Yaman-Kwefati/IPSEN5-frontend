export class Notification {
  private _id: string;
  private _type: string;
  private _title: string;
  private _message: string;
  private _date: Date;

  constructor(id: string, type: string, title: string, message: string, date: Date) {
    this._id = id;
    this._type = type;
    this._title = title;
    this._message = message;
    this._date = date;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }

  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
  }

}