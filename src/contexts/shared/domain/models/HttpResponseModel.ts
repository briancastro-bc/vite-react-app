export interface HttpResponse<T> {
  success: boolean;
	statusCode: number;
	timestamp: string;
	error?: string | null;
	data: T;
}