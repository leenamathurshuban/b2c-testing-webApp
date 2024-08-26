import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "apiProductSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/WP_APIs`,
  }),
  endpoints: (builder) => ({
    getCollections: builder.query({
      query: (id) => `/collections/${id}`,
    }),
    getProductsByCollectionId: builder.query({
      query: ({ id, limit = 10, cursor = 1 }) =>
        `/products/${id}?cursor=${cursor}&limit=${limit}`,
    }),
  }),
});
export const { useGetCollectionsQuery, useGetProductsByCollectionIdQuery } =
  apiSlice;
