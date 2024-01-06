import React from 'react'
import { Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { visuallyHidden } from "@mui/utils";


const headCells = [
    {
      id: "leadName",
      numeric: false,
      disablePadding: true,
      label: "Lead Name",
    },
    {
      id: "company",
      numeric: true,
      disablePadding: false,
      label: "Company",
    },
    {
      id: "email",
      numeric: true,
      disablePadding: false,
      label: "Email",
    },
    {
      id: "phone",
      numeric: true,
      disablePadding: false,
      label: "Phone",
    },
    {
      id: "leadSource",
      numeric: true,
      disablePadding: false,
      label: "Lead Source",
    },
    {
      id: "leadOwner",
      numeric: true,
      disablePadding: false,
      label: "Lead Owner",
    },
  ];

function EnhancedTableHead(props) {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  


export default EnhancedTableHead
