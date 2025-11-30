export interface ChatCompletionResponse {
  id: string;
  object: "chat.completion";
  created: number;
  model: string;
  choices: Choice[];
  usage: Usage;
  service_tier?: string;
  system_fingerprint?: string | null;
}

export interface Choice {
  index: number;
  message: ChatMessage;
  logprobs: unknown | null;
  finish_reason: string;
}

export interface ChatMessage {
  role: "assistant" | "user" | "system";
  content: string;
  refusal: string | null;
  annotations: string[];
}

export interface Usage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  prompt_tokens_details: TokenDetails;
  completion_tokens_details: TokenDetails;
}

export interface TokenDetails {
  cached_tokens?: number;
  audio_tokens?: number;
  reasoning_tokens?: number;
  accepted_prediction_tokens?: number;
  rejected_prediction_tokens?: number;
}
