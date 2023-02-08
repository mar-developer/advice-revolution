import {createApi} from '@reduxjs/toolkit/query/react';

import customFetchBase from './customFetchBase';

import {
    IEmployee, 
    IEmployeeContact,
    IEmployeeAddress,
    setEmployees
} from '../../pages/Home/homeSlice'

export const employeesApi = createApi({
    reducerPath: 'employeesApi',
    baseQuery: customFetchBase,
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        getEmployees: builder.query<any, void>({
            query: () => '/hub/api/v1/people',
            transformResponse: (result: { items: IEmployee } ) => result.items,
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    const { data } = await queryFulfilled;

                    dispatch( setEmployees(data) );
                } catch (error) {}
            }
        }),
        getContactDetails: builder.query<any, any>({
            query: (payload) => {
                const { employeeIds } = payload;
                let paramIds: string = '';

                employeeIds.forEach((id: any) => {
                    paramIds += `&ownerIdList=${id}`
                })


                return {
                    url: `/hub/api/v1/contact-details?${paramIds}`,
                    params: {
                        entryStatus: 'ACTIVE',
                        pageSize: 100,
                    },
                };
            },
            transformResponse: (result: { items: IEmployeeContact } ) => result.items,
        }),
        getAddresses: builder.query<any, any>({
            query: (payload) => {
                const { employeeIds } = payload;
                let paramIds: string = '';

                employeeIds.forEach((id: any) => {
                    paramIds += `&ownerIdList=${id}`
                })

                return {
                    url: `/hub/api/v1/addresses?${paramIds}`,
                    params: {
                        entryStatus: 'ACTIVE',
                        pageSize: 100,
                    },
                };
            },
            transformResponse: (result: { items: IEmployeeAddress } ) => result.items,
        }),
        deleteUser: builder.mutation<any, any>({
            query: (payload) => {
                const { entryId, practiceId } = payload;

                return {
                    url: `/hub/api/v1/people/${entryId}?practiceId=${practiceId}`,
                    method: 'DELETE',
                };
            }
        }),
    }),
});

export const {
    useGetEmployeesQuery,
    useGetAddressesQuery,
    useDeleteUserMutation,
    useGetContactDetailsQuery,
} = employeesApi;