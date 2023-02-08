import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IEmployee {
    entryId: number;
    firstName: string;
    lastName: string;
    preferredName: string;
    dateOfBirth: string;
    gender: string;
    maritalStatus: string;
    mobileNumber: string;
    homeEmail: string;
    officeEmail: string;
    homeAddress: string;
    officeAddress: string;
}

export interface IEmployeeContact {
    entryId: string,
    entryStatus: string,
    ownerId: string,
    ownerType: string,
    contactType: string,
    detail: string,
    xplanIndex: string,
    ownerName: string
}

export interface IEmployeeAddress {
    entryId: string,
    entryStatus: string,
    ownerId: string,
    ownerType: string,
    addressType: string,
    line1: string,
    line2: string,
    city: string,
    state: string,
    postcode: string,
    ownerName: string
}

interface IEmployeesState {
    employees: IEmployee[];
}

const initialState: IEmployeesState = {
    employees: []
}

export const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        setEmployees: (state, action: PayloadAction<any>) => {
            state.employees = action.payload;
        }
    }
})

export const { 
    setEmployees
} = employeesSlice.actions;
export const selectEmployees = (state: any) => state.home.employees;

export default employeesSlice.reducer;
