export default class ApiError {
  statusCode!: number;
  message!: string;
  timestamp!: Date;

  constructor(init?: Partial<ApiError>) {
    Object.assign(this, init);
  }
}
