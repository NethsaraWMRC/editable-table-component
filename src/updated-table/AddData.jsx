import React from 'react'
import SelectedBox from './selectedLists';

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
  function createData(leadName,email,phone,leadOwner) {
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
  
  const AddData = [
    createData("lead 1","demoEmail1@gmail.com",777476351,"owner 1"),
    createData("lead 2","demoEmail2@gmail.com",777476352,"owner 2"),
    createData("lead 3", "demoEmail3@gmail.com",777476353,"owner 3"),
    createData("lead 4", "demoEmail4@gmail.com",777476354,"owner 4"),
    createData("lead 5","demoEmail5@gmail.com",777476355,"owner 5"),
    createData("lead 6","demoEmail5@gmail.com",777476355,"owner 6"),
  ];

export default AddData
