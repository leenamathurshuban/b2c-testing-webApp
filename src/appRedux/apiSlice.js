import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setChildCollectionData } from "./counterReducer";
import { isRejectedWithValue } from "@reduxjs/toolkit";

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
          // console.log(error);
        }
      },
    }),
    getColletionById: builder.mutation({                                            //only for sale your mac
      query: ({ id }) => ({
        url: `/collections/${id}`,
        method: "GET",
        credentials: "include",
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
          // console.log(error);
          isRejectedWithValue(error);
        }
      },
    }),
    getProductById: builder.mutation({                                                    //only for sale your mac
      query: ({ id,limit = 10, cursor = 1 }) => ({
        url: `/products/${id}?cursor=${cursor}&limit=${limit}`,
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
        try {
          const result = await queryFulfilled;

          // dispatch(
          //   setChildCollectionData({
          //     data: result.data,
          //   })
          // );
        } catch (error) {
          // console.log(error);
          isRejectedWithValue(error);
        }
      },
    }),
    getPopularProductsParts:builder.query({
      query:()=> `https://shop.applefixpros.com/wp-json/custom-woo/v1/popular`
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
  useLazySearchProductsQuery,
  useGetPopularProductsPartsQuery,
  useGetColletionByIdMutation,    //only for sale your mac
  useGetProductByIdMutation       //only for sale your mac
} = apiSlice;
