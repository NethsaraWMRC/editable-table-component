import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import SelectedBox from "./selectedLists";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import EnhancedTableHead from "./EnhancedTableHead";
import EditableCell from "./EditableCell";

const companyTypes = [
  { id: 1, name: 'company 1' },
  { id: 2, name: 'company 2' },
  { id: 3, name: 'company 3' },
  { id: 4, name: 'company 4' },
];
const sourceTypes = [
  { id: 1, name: 'source 1' },
  { id: 2, name: 'source 2' },
  { id: 3, name: 'source 3' },
  { id: 4, name: 'source 4' },
];



let id = 0;
function createData(leadName,company, email, phone, leadSource, leadOwner) {
  id += 1;
  return {
    id,
    leadName,
    company: <SelectedBox data={companyTypes}/>, // Render the Companies component here
    email,
    phone,
    leadSource:<SelectedBox data={sourceTypes}/>,
    leadOwner,
  };
}

const rows = [
  createData("lead 1",companyTypes,"demoEmail1@gmail.com",777476351,sourceTypes,"owner 1"),
  createData("lead 2",companyTypes,"demoEmail2@gmail.com",777476352,sourceTypes,"owner 2"),
  createData("lead 3", companyTypes,"demoEmail3@gmail.com",777476353,sourceTypes,"owner 3"),
  createData("lead 4",companyTypes, "demoEmail4@gmail.com",777476354,sourceTypes,"owner 4"),
  createData("lead 5",companyTypes,"demoEmail5@gmail.com",777476355,sourceTypes,"owner 5"),
  createData("lead 6",companyTypes,"demoEmail5@gmail.com",777476355,sourceTypes,"owner 6"),
];

const heads = [[
  { id: 'leadName', label: 'Lead Name' },
  { id: 'company', label: 'Company' },
  { id: 'email', label: 'Email' },
  { id: 'phone', label: 'Phone' },
  { id: 'leadSource', label: 'Lead Source' },
  { id: 'leadOwner', label: 'Lead Owner' },
]]


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


// table-----------------------------------------------------------------------------------------------------------------------

export default function DashTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [editingCell, setEditingCell] = React.useState(null);
  const [editedValue, setEditedValue] = React.useState('');
  const [tableRows, setTableRows] = React.useState(rows);
  const [editedRows, setEditedRows] = React.useState({});
  const [originalValues, setOriginalValues] = React.useState({});
  
  // ... (functions for handling sorting, selection, delete,filter) ...

  const handleDelete = () => {
    const updatedRows = tableRows.filter((row) => !selected.includes(row.id));
    setTableRows(updatedRows);
    setSelected([]);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
  
    if (selectedIndex === -1) {
      newSelected = [...selected, id]; // Add the clicked row to selection
    } else {
      newSelected = selected.filter((selectedId) => selectedId !== id); // Remove the clicked row from selection
    }
    setSelected(newSelected);
    
  };

  const handleCellClick = (rowId, defaultValue, columnId) => {
    setEditingCell({ rowId, columnId });
    setEditedRows({ ...editedRows, [rowId]: true });
    setEditedValue(defaultValue);
    setOriginalValues({ ...originalValues, [rowId]: defaultValue });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  

    const handleInputChange = (event) => {
      setEditedValue(event.target.value);
    };
  
    const handleInputKeyPress = (event, rowId, columnId) => {
      if (event.key === 'Enter') {
        const updatedRows = tableRows.map((row) =>
          row.id === rowId ? { ...row, [columnId]: editedValue } : row
        );
  
        setTableRows(updatedRows);
        setEditedValue('');
        setEditingCell(null);
        setEditedRows({ ...editedRows, [rowId]: false });
      }
    };
  
    const handleInputBlur = (event, rowId, columnId) => {
      const updatedRows = tableRows.map((row) =>
        row.id === rowId ? { ...row, [columnId]: editedValue } : row
      );
  
      setTableRows(updatedRows);
      setEditedValue('');
      setEditingCell(null);
      setEditedRows({ ...editedRows, [rowId]: false });
    };
  
    const visibleRows = React.useMemo(
      () =>
        stableSort(tableRows, getComparator(order, orderBy)).slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        ),
      [order, orderBy, page, rowsPerPage, tableRows]
    );

 
//---------------------------------------------------------------------------------------------------------  
 
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>

      <EnhancedTableToolbar
        numSelected={selected.length}
        handleDelete={handleDelete}
      />

        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              columns={heads}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => event.stopPropagation()}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox" onClick={(event) => event.stopPropagation()}>
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onChange={(event) => handleClick(event, row.id)}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <EditableCell
                      rowId={row.id}
                      columnId="leadName"
                      value={row.leadName}
                      editedValue={editedValue}
                      editingCell={editingCell}
                      handleCellClick={handleCellClick}
                      handleInputChange={handleInputChange}
                      handleInputBlur={handleInputBlur}
                      handleInputKeyPress={handleInputKeyPress}
                      alignText={'left'}
                    />

                    <TableCell align="right">{row.company}</TableCell>
                    
                    <EditableCell
                      rowId={row.id}
                      columnId="email"
                      value={row.email}
                      editedValue={editedValue}
                      editingCell={editingCell}
                      handleCellClick={handleCellClick}
                      handleInputChange={handleInputChange}
                      handleInputBlur={handleInputBlur}
                      handleInputKeyPress={handleInputKeyPress}
                      alignText={'right'}
                    />

                    <EditableCell
                      rowId={row.id}
                      columnId="phone"
                      value={row.phone}
                      editedValue={editedValue}
                      editingCell={editingCell}
                      handleCellClick={handleCellClick}
                      handleInputChange={handleInputChange}
                      handleInputBlur={handleInputBlur}
                      handleInputKeyPress={handleInputKeyPress}
                      alignText={'right'}
                    />

                    <TableCell align="right">{row.leadSource}</TableCell>

                    
                      <EditableCell
                        rowId={row.id}
                        columnId="leadOwner"
                        value={row.leadOwner}
                        editedValue={editedValue}
                        editingCell={editingCell}
                        handleCellClick={handleCellClick}
                        handleInputChange={handleInputChange}
                        handleInputBlur={handleInputBlur}
                        handleInputKeyPress={handleInputKeyPress}
                        alignText={'right'}                 
                      />
                  

                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
