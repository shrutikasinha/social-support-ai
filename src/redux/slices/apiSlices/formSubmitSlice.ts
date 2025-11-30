import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { FormDataValues } from "../../../types/formValues";

interface AIWriteResponse {
  content: string;
}

export const postForm = createApi({
  reducerPath: "postForm",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json; charset=UTF-8");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    postFormData: builder.query<AIWriteResponse, FormDataValues>({
      query: (data) => ({
        url: "/posts",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
  }),
});

export const { useLazyPostFormDataQuery } = postForm;
