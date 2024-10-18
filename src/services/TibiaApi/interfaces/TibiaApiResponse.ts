export interface ITibiaApiResponse {
  information: {
    status: {
      http_code: number;
      error?: number;
      message?: string;
    };
    timestamp: string;
  };
}
