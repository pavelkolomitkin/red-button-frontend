export default class User
{
  public id: number;

  public email: string;

  public fullName: string;

  public phoneNumber?: string;

  public roles: Array<string> = [];
}
