import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const url = "https://movie-project-server.onrender.com";
const url = "http://localhost:5000";

export const apiSlice = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: (headers) => {
      if (localStorage.getItem("profile")) {
        headers.set(
          "authorization",
          `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
        );
      }
      return headers;
    },
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (body) => `/posts/?page=${body.page}`,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({ type: "Post", id: _id })),
              "Post",
            ]
          : ["Post"],
    }),

    getPost: builder.query({
      query: (body) => `/posts/${body.id}`,
      providesTags: (result, error, arg) => [{ type: "Post", id: result._id }],
    }),

    searchPosts: builder.query({
      query: (body) =>
        `/posts/search?searchQuery=${
          body.search || "none"
        }&tags=${body.tags.join(",")}`,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({ type: "Post", id: _id })),
              "Post",
            ]
          : ["Post"],
    }),

    createPosts: builder.mutation({
      query: (body) => ({
        url: "/posts",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Post"],
    }),

    updatePost: builder.mutation({
      query: (body) => ({
        url: `/posts/${body._id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Post", id: result._id },
      ],
    }),

    deletePost: builder.mutation({
      query: (body) => ({
        url: `/posts/${body._id}`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Post"],
    }),
    likePost: builder.mutation({
      query: (body) => ({
        url: `/posts/${body._id}/likePost`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Post", id: result._id },
      ],
    }),

    commentPost: builder.mutation({
      query: (body) => ({
        url: `/posts/${body._id}/commentPost`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Post", id: result._id },
      ],
    }),

    commentDelete: builder.mutation({
      query: (body) => ({
        url: `/posts/${body._id}/commentPost/${body.index}`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Post", id: result._id },
      ],
    }),

    signIn: builder.mutation({
      query: (body) => ({
        url: "/users/signin",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["Post"],
    }),
    signUp: builder.mutation({
      query: (body) => ({
        url: "/users/signup",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useSearchPostsQuery,
  useCreatePostsMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useSignInMutation,
  useSignUpMutation,
  useCommentPostMutation,
  useCommentDeleteMutation,
} = apiSlice;
