export interface HttpOperation<T> {
  success: boolean;
	statusCode: number;
	timestamp: string;
	error?: string | null;
	data: T;
}