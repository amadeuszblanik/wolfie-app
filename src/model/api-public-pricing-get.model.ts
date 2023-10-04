export default class ApiPublicPricingGetResponse {
  name!: string;
  description!: string;
  featured!: boolean;
  price!: ApiPublicPricingGetPrice;
  limits!: ApiPublicPricingGetLimits;

  constructor(init?: Partial<ApiPublicPricingGetResponse>) {
    Object.assign(this, init);
  }
}

export class ApiPublicPricingGetLimits {
  pets!: number;
  healthLogs!: number | null;
  vets!: number;

  constructor(init?: Partial<ApiPublicPricingGetLimits>) {
    Object.assign(this, init);
  }
}

export class ApiPublicPricingGetPrice {
  monthly!: string;
  yearly!: ApiPublicPricingGetYearly;

  constructor(init?: Partial<ApiPublicPricingGetPrice>) {
    Object.assign(this, init);
  }
}

export class ApiPublicPricingGetYearly {
  value!: string;
  discount!: string;
  regula!: string;

  constructor(init?: Partial<ApiPublicPricingGetYearly>) {
    Object.assign(this, init);
  }
}
