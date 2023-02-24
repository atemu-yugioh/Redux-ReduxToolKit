import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post } from 'types/blog.type'

// * Nếu bên slice chúng ta dùng createSlce để tạo slice thì bên RTK query dùng createApi
// * Với createApi chúng ta gọi là slice api
// * Sẽ khai báo baseUrl và các endpoint

// * baseQuery được dùng cho mỗi endpoint để fetch api

// * fetchBaseQuery là 1 function nhở được xây dựng trên fetch API
// * Nó không hoàn toàn thay thế được axios như sẽ giải quyết hầu hết các vấn đề

// * endPoints là tập hợp những method giúp get,post, put, delete để tương tác với api
// * endpoints có 2 kiểu là query và mutation
// * matation: thường dùng cho các trường hợp thay đổi dữ liệu trên server: POST, PUT, PATCH, DELETE ...

export const blogApi = createApi({
  reducerPath: 'blogApi', //* têm field trong redux state
  tagTypes: ['Posts'], // Những kiểu tag cho phép dùng trong blogApi
  keepUnusedDataFor: 10, //* Giữ data trong 10s sẽ xóa, mặc định là 60s
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/',
    prepareHeaders(headers) {
      headers.set('authorization', 'Bearer token-jwt')
    }
  }),
  endpoints: (build) => ({
    //* Generic type theo thứ tự là kiểu response trả về và argument
    getPosts: build.query<Post[], void>({
      query: () => 'posts', //* method không có argument
      providesTags(result) {
        if (result) {
          const final = [
            ...result.map(({ id }) => ({ type: 'Posts' as const, id: id })),
            { type: 'Posts' as const, id: 'LIST' }
          ]
          return final
        }
        return [{ type: 'Posts' as const, id: 'LIST' }]
      }
    }),
    addPost: build.mutation<Post, Omit<Post, 'id'>>({
      query(body) {
        return {
          url: 'posts',
          method: 'POST',
          body
        }
      },
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Posts', id: 'LIST' }])
    }),
    getPost: build.query<Post, string>({
      query: (id) => ({
        url: `posts/${id}`,
        headers: {
          hello: 'Im duoc'
        },
        params: {
          first_name: 'Nguyen',
          'last-name': 'Thieng'
        }
      })
    })
  })
})

export const { useGetPostQuery, useAddPostMutation, useGetPostsQuery } = blogApi
