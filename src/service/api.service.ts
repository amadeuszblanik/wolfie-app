import ApiBase from "@/service/api-base.service";
import ApiPublicPricingGetResponse from "@/model/api-public-pricing-get.model";
import ApiPublicGdprGetResponse from "@/model/api-public-gdpr-get.model";

export default class ApiService extends ApiBase {
  public = {
    pricing: {
      get: () => this.get<ApiPublicPricingGetResponse[]>("/public/pricing"),
    },
    gdpr: {
      get: () => this.get<ApiPublicGdprGetResponse>("/public/gdpr"),
    },
  };

  constructor() {
    super();
  }
}
