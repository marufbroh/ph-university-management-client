import { TQueryParam, TResponseRedux } from '../../../types';
import { TOfferedCourse } from '../../../types/studentCourse.type';
import { baseApi } from '../../api/baseApi';

const studentCourseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOfferedCourses: builder.query({
      query: (args) => {
        console.log(args);
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: '/offered-courses/my-offered-courses',
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['offeredCourse'],
      transformResponse: (response: TResponseRedux<TOfferedCourse[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
  
  }),
});

export const {
  useGetAllOfferedCoursesQuery,
  
} = studentCourseApi;