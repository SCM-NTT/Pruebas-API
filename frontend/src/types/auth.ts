export interface UserProfile {
  name: string;
  email: string;
}

export interface ApiResponse<T> {
  message: string;
  user: T;
}
