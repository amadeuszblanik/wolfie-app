import { RefreshTokenResponseModel } from "../response-model/refresh-token.response-model";

const refreshTokenDto = (data: RefreshTokenResponseModel): RefreshTokenResponseModel =>
  data.map((entry) => ({
    id: entry.id,
    device: entry.device,
    expiration: new Date(entry.expiration),
  }));

export default refreshTokenDto;
