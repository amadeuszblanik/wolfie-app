export interface AuthLimitApi {
  pets: {
    used: number;
    limit: number | null;
    canAdd: boolean;
  };
  healthLogs: {
    used: number;
    limit: number | null;
    canAdd: boolean;
  };
  weights: {
    used: number;
    limit: number | null;
    canAdd: boolean;
  };
  vets: {
    used: number;
    limit: number | null;
    canAdd: boolean;
  };
}
