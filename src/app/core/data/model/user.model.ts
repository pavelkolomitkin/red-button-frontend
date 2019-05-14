export default class User
{
  public id: number;

  public email: string;

  public fullName: string;

  public phoneNumber?: string;

  public isActive?: boolean;

  public roles: Array<string> = [];

  public createdAt: number;

  isAdmin()
  {
    return this.roles.includes('ROLE_ADMIN_USER');
  }

  isClient()
  {
    return this.roles.includes('ROLE_CLIENT_USER');
  }

  static createFromRawData(data: any)
  {
    const result: User = Object.assign(new User(), data);

    return result;
  }
}
