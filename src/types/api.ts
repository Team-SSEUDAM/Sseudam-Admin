export interface ApiResponse<T> {
  success: boolean;
  status: number;
  data: T;
  timestamp: string;
}
