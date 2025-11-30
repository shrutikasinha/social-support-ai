import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ChatCompletionResponse } from "../../../types/suggestionsApi";

interface AIWriteRequest {
  fieldName: string;
  context: string;
  currentValue?: string;
}

interface AIWriteResponse {
  content: string;
}

export const suggestionsApi = createApi({
  reducerPath: "aiApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openai.com/v1",
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        `Bearer ${import.meta.env.VITE_OPENAI_ID}`,
      );
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    generateContent: builder.mutation<AIWriteResponse, AIWriteRequest>({
      query: (data) => ({
        url: "/chat/completions",
        method: "POST",
        body: {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `You are a helpful writing assistant.Always write in first-person (“I”).`,
            },
            {
              role: "user",
              content: `Context: ${data.context}\n\nCurrent value: ${data.currentValue || "None"}\n\nPlease generate appropriate content for this field.`,
            },
          ],
          temperature: 0.7,
        },
      }),
      transformResponse: (response: ChatCompletionResponse) => ({
        content: response.choices[0].message.content,
      }),
    }),
  }),
});

export const { useGenerateContentMutation } = suggestionsApi;
