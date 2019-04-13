export default interface RegisterData
{
  email: string,
  fullName: string,
  phoneNumber?: string,
  plainPassword: {
    password: string,
    passwordRepeat: string
  }
}
