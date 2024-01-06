import React from 'react'
import DashTable from './updated-table/DashTable.jsx';

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


function App() {

  return (
    <div className="App" style={{width:'1200px'}}>
      <DashTable headers={headCells}/>
      
    </div>
  );
}

export default App;
