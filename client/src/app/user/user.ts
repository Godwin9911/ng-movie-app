export class User  {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id?: string,
    public firstname = '',
    public lastname = '',
    public email = '',
    public password?: string
  ) { }
}

export class UserError {
  statusText: string;
  message: string;
}
