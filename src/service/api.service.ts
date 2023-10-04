import ApiBase from "@/service/api-base.service";
import ApiPublicPricingGetResponse from "@/model/api-public-pricing-get.model";

export default class ApiService extends ApiBase {
  public = {
    pricing: {
      get: () => this.get<ApiPublicPricingGetResponse[]>("/public/pricing"),
    },
  };

  constructor() {
    super();
  }
}
