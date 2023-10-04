export default class ApiAuthConfirmEmailPostPayload {
  token!: string;

  constructor(init?: Partial<ApiAuthConfirmEmailPostPayload>) {
    Object.assign(this, init);
  }
}
