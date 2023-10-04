export default class ApiGenericMessage {
  success!: boolean;
  message!: string;

  constructor(init?: Partial<ApiGenericMessage>) {
    Object.assign(this, init);
  }
}
