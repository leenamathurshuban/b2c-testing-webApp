import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setChildCollectionData } from "./counterReducer";

export const apiSlice = createApi({
  reducerPath: "apiProductSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/WP_APIs`,
  }),
  endpoints: (builder) => ({
    getCollections: builder.query({
      query: (id) => ({
        url: `/collections/${id}`,
        method: "GET",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            setChildCollectionData({
              data: result.data,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    getProductsByCollectionId: builder.query({
      query: ({ id, limit = 10, cursor = 1 }) =>
        `/products/${id}?cursor=${cursor}&limit=${limit}`,
    }),
    searchProducts: builder.query({
      query: ({ query, page = 1 }) => ({
        url: `https://shop.applefixpros.com/wp-json/custom-woo/v1/search/?quaryvar=${query}&page=${page}`,
        method: "GET",
      }),
    }),
  }),
});

export const { 
  useGetCollectionsQuery, 
  useGetProductsByCollectionIdQuery, 
  useSearchProductsQuery, 
  useLazySearchProductsQuery
} = apiSlice;
