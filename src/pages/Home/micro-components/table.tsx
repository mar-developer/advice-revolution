import React, {useState, useEffect} from 'react'
import {TableWrapper, Icon} from './style'

import arrowUP from '../../../assets/arrowUp.png'
import arrowDown from '../../../assets/arrowDown.png'

interface TableProps {
    data: any[]
    columns: any[],
    selectable?: boolean,
    deletable?: boolean,
    onChange?(): (data: any[]) => void
    onDelete: (data: object) => void
    onSelection: (data: any[]) => void
}

//create a test for this page using react testing library

const Table = ({
    data, 
    columns, 
    selectable, 
    deletable,
    onChange,
    onDelete,
    onSelection
}: TableProps) => {
    const [tableData, setTableData] = useState(data)
    const [sortDir, setSortDir] = useState('DESC')

    useEffect(() => {
        setTableData(data)
    }, [data])

    const onSortingChange = (column: any) => {
        if (column.sortable) {
            const sortedData = data.slice().sort((a, b) => {
                if (sortDir === 'DESC') {
                    return a[column.dataIndex] > b[column.dataIndex] ? 1 : -1
                } else {
                    return a[column.dataIndex] < b[column.dataIndex] ? 1 : -1
                }
            })

            setSortDir(sortDir === 'DESC' ? 'ASC' : 'DESC')
            setTableData(sortedData)
        }
    }

    const handleUserDelete = (data: any) => {
        onDelete(data)
    }

    const handleUserSelect = (data: any) => {
        const {entryId, selected} = data
        const selectedIds = tableData.filter((row) => row.selected)
        const index = selectedIds.indexOf(entryId)

        if (selected) {
            if (index === -1) {
                selectedIds.push(entryId)
            }
        } else {
            if (index !== -1) {
                selectedIds.splice(index, 1)
            }
        }

        const newData = tableData.map((row) => {
            if (row.entryId === entryId) {
                return {
                    ...row,
                    selected: selected
                }
            }
            return row
        })

        const newSelectedIds = newData.filter((row) => row.selected)

        setTableData(newData)
        onSelection(newSelectedIds)
    }

    return (
        <TableWrapper>
            <thead>
                <tr>
                    { selectable && (
                        <th></th>
                    )}
                    {columns.map((column, i) => (
                        <th key={i}>{column.title}
                            { column.sortable && (
                                <>
                                    {sortDir === 'ASC' 
                                        ?  <Icon 
                                            onClick={() => onSortingChange(column)}
                                            src={arrowUP} 
                                            alt="" 
                                            />
                                        :  <Icon 
                                            onClick={() => onSortingChange(column)}
                                            src={arrowDown} 
                                            alt="" 
                                            />
                                    }
                                </>
                                )
                            }
                        </th>
                    ))}
                    { deletable && (
                        <th></th>
                    )}
                </tr>
            </thead>
            <tbody>
                {tableData.map((row, i) => (
                    <tr key={i}>
                        { selectable && (
                            <td>
                                <input
                                    type="checkbox"
                                    checked={row.selected}
                                    onChange={(e) => {
                                        handleUserSelect({
                                            entryId: row.entryId,
                                            practiceId: row.practiceId,
                                            selected: e.target.checked
                                        })
                                    }}
                                />
                            </td>
                        )}
                        {columns.map((column) => (
                            <td key={column.dataIndex}>{row[column.dataIndex]}</td>
                        ))}
                        { deletable && (
                            <td>
                                <button 
                                    className='delete-button'
                                    onClick={
                                        () => handleUserDelete({
                                            entryId: row.entryId,
                                            practiceId: row.practiceId
                                        })
                                    }
                                >Delete</button>
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </TableWrapper>
    )
}

export default Table