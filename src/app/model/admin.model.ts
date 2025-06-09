export interface LoginResponse {
  userId: number;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
