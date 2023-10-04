export default class ApiAuthResetPasswordPutPayload {
  token!: string;
  password!: string;

  constructor(init?: Partial<ApiAuthResetPasswordPutPayload>) {
    Object.assign(this, init);
  }
}
