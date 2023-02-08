/* eslint-disable react-hooks/exhaustive-deps */
//create a jest test for this page
import React, { useEffect, useState } from 'react'
import { 
    useAppSelector, 
    useAppDispatch 
} from '../../app/hooks';

import {
    useGetEmployeesQuery,
    useGetAddressesQuery,
    useDeleteUserMutation,
    useGetContactDetailsQuery, 
} from '../../app/api/employees'

import {
    setEmployees,
    selectEmployees 
} from './homeSlice';

import Filter from './micro-components/filter'
import Table from './micro-components/table'
import {columns} from './constants'
import { 
    Card,
    Button,
    Container, 
} from './style'

export default function Employees() {
    const employees = useAppSelector(selectEmployees)
    const dispatch = useAppDispatch()

    const [employeeClone, setEmployeeClone] = useState([] as any)
    const [employeeIds, setEmployeeIds] = useState([])
    const [Loading, setLoading] = useState(false)
    const [hasError, setError] = useState(false)
    const [hasFilter, setFilter] = useState(false)
    const [selectedIds, setSelectedIds] = useState([])
    const [deleteUser] = useDeleteUserMutation()


    const {
        data: employeesData,
        isLoading: employeesLoading,
        isSuccess: employeesSuccess,
    } = useGetEmployeesQuery()

    const {
        data: contactDetails,
        isLoading: contactDetailsLoading,
        isSuccess: contactDetailsSuccess,
    } = useGetContactDetailsQuery({employeeIds}, { skip: employeeIds.length === 0 })

    const {
        data: addresses,
        isLoading: addressesLoading,
        isSuccess: addressesSuccess,
    } = useGetAddressesQuery({employeeIds}, { skip: employeeIds.length === 0 })


    useEffect(() => {
        setLoading(employeesLoading || contactDetailsLoading || addressesLoading)
    }, [employeesLoading, contactDetailsLoading, addressesLoading])

    useEffect(() => {
        setError(!employeesSuccess || !contactDetailsSuccess || !addressesSuccess)
    }, [employeesSuccess, contactDetailsSuccess, addressesSuccess])


    useEffect(() => {
        if (employeesData) {
            const ids = employeesData.map((employee: any) => employee.entryId)
            setEmployeeIds(ids)
        }
    }, [employeesData])

    useEffect(() => {
        if (contactDetails && addresses) {
            const employeesClone: any[] = []

            employees.forEach((employee: any) => {
                const employeeClone = {...employee}

                const contact = contactDetails.filter((contact: any) => contact.ownerId === employee.entryId)
                const address = addresses.filter((address: any) => address.ownerId === employee.entryId)

                contact.forEach((contact: any) => {
                    if (contact.contactType === 'Home Email') {
                        Object.assign(employeeClone, {homeEmail: contact.detail})
                    }

                    if ( contact.contactType === 'phome') {
                        Object.assign(employeeClone, {mobileNumber: contact.detail})
                    }
                })

                address.forEach((address: any) => {
                    if (address.addressType === 'Postal') {
                        Object.assign(employeeClone, {
                            homeAddress: address.line1 + ', ' + address.line2 + ', ' + address.city + ', ' + address.state + ', ' + address.country + ', ' + address.postcode
                        })
                    }

                    if (address.addressType === 'Business') {
                        Object.assign(employeeClone, {
                            officeAddress: address.line1 + ', ' + address.line2 + ', ' + address.city + ', ' + address.state + ', ' + address.country + ', ' + address.postcode
                        })
                    }
                })

                employeesClone.push(employeeClone)
            })

            const uniqueEmployees = [...new Map(employeesClone.map(item => [item['entryId'], item])).values()]

            dispatch(setEmployees(uniqueEmployees))
            setEmployeeClone(uniqueEmployees)
        }
    }, [contactDetails, addresses])

    const applyFilter = (data: any) => {
        const { search, gender, hasMobile, hasAddress} = data
        const hasFilter = search !== '' || gender !== 'all' || hasMobile || hasAddress
        const filteredEmployees: any[] = []

        if (hasFilter) {
            if (search !== '') {
                employees.forEach((employee: any) => {
                    if (employee.firstName?.includes(search)) {
                        filteredEmployees.push(employee)
                    }
    
                    if (employee.lastName?.includes(search)) {
                        filteredEmployees.push(employee)
                    }
    
                    if (employee.preferredName?.includes(search)) {
                        filteredEmployees.push(employee)
                    }
                })
            }
    
            if (gender !== 'all') {
                employees.forEach((employee: any) => {
                    if (employee.gender === gender) {
                        filteredEmployees.push(employee)
                    }
                })
            }
    
            if (hasMobile) {
                employees.forEach((employee: any) => {
                    if (employee.mobileNumber) {
                        filteredEmployees.push(employee)
                    }
                })
            }
    
            if (hasAddress) {
                employees.forEach((employee: any) => {
                    if (employee.homeAddress || employee.officeAddress) {
                        filteredEmployees.push(employee)
                    }
                })
            }

            const uniqueEmployees = [...new Map(filteredEmployees.map(item => [item['entryId'], item])).values()]
    
            setEmployeeClone(uniqueEmployees)
        } else {
            setEmployeeClone(employees)
        }
    }

    const handleSelectedIds = (data: any) => {
        setSelectedIds(data)
    }

    const handleBatchDelete = () => {
        selectedIds.forEach((user: any) => {
            deleteUser({
                entryId: user.entryId,
                practiceId: user.practiceId
            })
        })
    }

    return (
        <Container>
            <h1>People Entries</h1>

            <Card>
                {Loading 
                ? <p>Loading...</p> 
                : hasError
                 ? <p>Something went wrong</p>
                 : <div className='wrapper'>
                    {
                        hasFilter 
                        ? <Filter 
                            onClear={() => {
                                setFilter(false)
                                setEmployeeClone(employees)
                            }}
                            onApply={(data) => applyFilter(data)}
                        />
                        : <Button onClick={() => setFilter(!hasFilter)} >
                            Filter
                        </Button>
                    }
                    {
                        selectedIds.length > 0 
                        && <Button onClick={handleBatchDelete} >
                            Batch Delete
                        </Button>
                    }
                    <Table 
                        deletable
                        selectable
                        data={employeeClone}
                        columns={columns}
                        onSelection={(data) => handleSelectedIds(data)}
                        onDelete={(data) => deleteUser(data)}
                    />
                 </div>
                 
                }
            </Card>

        </Container>
    )
}