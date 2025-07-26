import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type Job = {
  id: string;
  title: string;
  orgName: string;
  location: string[];
  description: string;
  logoUrl: string;
  categories: string[];
  responsibilities: string;
  idealCandidate: string;
  whenAndWhere: string;
  datePosted: string;
  deadline: string;
  startDate: string;
  endDate: string;
  requiredSkills: string[];
};


type JobsApiResponse = {
  success: boolean;
  message: string;
  data: Job[];
  count: number;
};


type JobApiResponse = {
  success: boolean;
  message: string;
  data: Job;
};


export const jobApi = createApi({

  reducerPath: 'jobApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://akil-backend.onrender.com/' }),
  endpoints: (builder) => ({
    
    getJobs: builder.query<Job[], void>({
      query: () => 'opportunities/search',
      transformResponse: (response: JobsApiResponse) => response.data,
    }),
    

    getJobById: builder.query<Job, string>({
      query: (id) => `opportunities/${id}`,
      transformResponse: (response: JobApiResponse) => response.data,
    }),
  }),
});
export const { useGetJobsQuery, useGetJobByIdQuery } = jobApi;