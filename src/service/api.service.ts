import ApiBase from "@/service/api-base.service";
import ApiPublicPricingGetResponse from "@/model/api-public-pricing-get.model";
import ApiPublicGdprGetResponse from "@/model/api-public-gdpr-get.model";
import ApiAuthConfirmEmailPostPayload from "@/model/api-auth-confirm-email-post.model";
import ApiGenericMessage from "@/model/api-generic-message.model";

export default class ApiService extends ApiBase {
  auth = {
    confirmEmail: {
      post: (payload: ApiAuthConfirmEmailPostPayload) => this.post<ApiGenericMessage>(`/auth/confirm-email`, payload),
    },
  };

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
