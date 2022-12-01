export interface RefreshTokenSingle {
  id: string;
  device: string;
  expiration: Date;
}

export type RefreshTokenResponseModel = RefreshTokenSingle[];
