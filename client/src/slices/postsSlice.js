import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useSelector, useDispatch } from "react-redux";
import { setAccessToken } from "./accessTokenSlice";
import { LOGOUT } from "./authSlice";
import { setLogin } from "./loginSlice";
import Cookies from "js-cookie";

// const url = "https://movie-project-server.onrender.com";
const url = process.env.REACT_APP_BACKEND_ADDRESS;

const baseQuery = fetchBaseQuery({
  baseUrl: url,
  credentials: "include",
});

export const apiSlice = createApi({
  reducerPath: "postApi",
  baseQuery: baseQuery,
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
        `/posts/search?en=${body.usingEnglish}&searchQuery=${
          body.search || "none"
        }&tags=${body.tags}`,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({ type: "Post", id: _id })),
              "Post",
            ]
          : ["Post"],
    }),

    searchTagsPosts: builder.query({
      query: (body) =>
        `/posts/search?searchQuery=${body.search || "none"}&tags=${body.tags}`,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({ type: "Post", id: _id })),
              "Post",
            ]
          : ["Post"],
    }),

    creatorPosts: builder.query({
      query: (body) =>
        `/posts/creator?creatorId=${body.creatorId}&page=${body.page}`,
      providesTags: (result, error, arg) =>
        result.data
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
      invalidatesTags:
        // ["Post"
        (result, error, arg) => [{ type: "Post", id: result._id }],
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

    naverSignIn: builder.query({
      query: () => "/users/naversignin",
    }),

    logout: builder.query({
      query: (body) => `/users/logout/${body.userId}`,
    }),

    passwordChange: builder.mutation({
      query: (body) => ({
        url: "/users/passwordchange",
        method: "PATCH",
        body,
      }),
    }),
    sendDeleteEmail: builder.mutation({
      query: (body) => ({
        url: "/email/delete",
        method: "POST",
        body,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (body) => ({
        url: "/email/verify",
        method: "PATCH",
        body,
      }),
    }),
    deleteAccount: builder.mutation({
      query: (body) => ({
        url: "/users/deleteaccount",
        method: "DELETE",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Post", id: result._id },
      ],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useSearchPostsQuery,
  useSearchTagsPostsQuery,
  useCreatePostsMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useSignInMutation,
  useSignUpMutation,
  useNaverSignInQuery,
  useLogoutQuery,
  useCommentPostMutation,
  useCommentDeleteMutation,
  usePasswordChangeMutation,
  useSendDeleteEmailMutation,
  useVerifyEmailMutation,
  useDeleteAccountMutation,
} = apiSlice;
