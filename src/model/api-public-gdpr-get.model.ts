export default class ApiPublicGdprGetResponse {
  content!: string;
  createdAt!: string;
  updatedAt!: string;

  constructor(init?: Partial<ApiPublicGdprGetResponse>) {
    Object.assign(this, init);
  }
}
