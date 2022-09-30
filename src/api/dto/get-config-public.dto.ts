import { ConfigPublicResponseModel } from "../response-model/config-public.response-model";

const getConfigPublicDto = (data: ConfigPublicResponseModel): ConfigPublicResponseModel => ({
  breeds: data.breeds,
});

export default getConfigPublicDto;
