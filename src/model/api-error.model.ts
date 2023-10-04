export default class ApiError {
  statusCode!: number;
  message!: string;
  timestamp!: Date;
  errors?: ApiErrorDetails[] = [];

  constructor(init?: Partial<ApiError>) {
    Object.assign(this, init);
  }
}

export class ApiErrorDetails {
  property!: string;
  children?: ApiErrorDetails[];
  constraints!: Record<string, string>;

  constructor(init?: Partial<ApiErrorDetails>) {
    Object.assign(this, init);
  }
}
