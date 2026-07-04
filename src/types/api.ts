export interface ApiResponseWrapper<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

export interface WebhookVerificationQuery {
  'hub.mode'?: string;
  'hub.verify_token'?: string;
  'hub.challenge'?: string;
}

export interface LLMProcessingResult {
  generatedText: string;
  predictedIntent: 'BOOKING' | 'INFORMATIONAL' | 'UNKNOWN';
  confidenceScore: number;
}