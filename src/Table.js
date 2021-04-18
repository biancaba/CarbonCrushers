import React, { useState } from "react";
import { useFilters, useTable, useSortBy } from "react-table";
import { GoChevronRight, GoChevronDown } from 'react-icons/go';
import { FiSearch } from 'react-icons/fi';
import TableExtension from './TableExtension';
import './css/Table.css';

export default function Table({ columns, data }) {
    const [filterInput, setFilterInput] = useState("");

    const handleFilterChange = e => {
        const value = e.target.value || undefined;
        setFilter("Food product", value);
        setFilterInput(value);
    };

    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups, if your table has groupings
        rows, // rows for the table based on the data passed
        prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
        setFilter // The useFilter Hook provides a way to set the filter
    } = useTable(
        {
            columns,
            data
        },
        useFilters, // Adding the useFilters Hook to the table
        useSortBy // This plugin Hook will help to sort our table columns
    );

    const [expandedRows, setExpandedRows ] = useState([]);

    const handleRowClick = rowId => {
        const currentExpandedRows = expandedRows;
        const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);
        
        const newExpandedRows = isRowCurrentlyExpanded ? 
			currentExpandedRows.filter(id => id !== rowId) : 
			currentExpandedRows.concat(rowId);
        
        setExpandedRows(newExpandedRows);
    }

    return (
        <>
            <div>
                <FiSearch />
                <input
                    value={filterInput}
                    onChange={handleFilterChange}
                    placeholder={"Search for food products to see their carbon emissions"}
                />
                <p style={{"font-style": "italic"}}>All numbers in the table correspond to kg CO2 per kg food product.</p>
            </div>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    className={
                                        column.isSorted
                                            ? column.isSortedDesc
                                            ? "sort-desc"
                                            : "sort-asc"
                                            : ""
                                    }
                                >
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, _) => {
                        prepareRow(row);
                        const clickCallback = () => handleRowClick(row.id);

                        if(expandedRows.includes(row.id)) {
                            return (
                                <>
                                    <tr id={"id:" + row.id} {...row.getRowProps()} onClick={clickCallback}>
                                        {row.cells.map(cell => {
                                            if(typeof(cell.value) == "undefined"){
                                                return <td {...cell.getCellProps()}><GoChevronDown/></td>;
                                            }
                                            if(typeof(cell.value) == "string") {
                                                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                            }
                                            return <td style={{"textAlign": "center"}} {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                        })}
                                    </tr>
                                    <TableExtension item={row.values}/>
                                </>
                            );
                        } else {
                            return (
                                <tr id={"id:" + row.id} {...row.getRowProps()} onClick={clickCallback}>
                                {row.cells.map(cell => {
                                    if(typeof(cell.value) == "undefined"){
                                        return <td {...cell.getCellProps()}><GoChevronRight/></td>;
                                    }
                                    if(typeof(cell.value) == "string") {
                                        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                    }
                                    return <td style={{"textAlign": "center"}} {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                })}
                                </tr>
                            );
                        }
                    })}
                </tbody>
            </table>
        </>
    );
}