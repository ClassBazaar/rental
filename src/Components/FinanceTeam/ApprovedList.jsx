import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import HamburgerMenu from "../HamburgerMenu";

import ListingComponent from "../StyleComponents/ListingComponent";
import UserManagementTable from "../AdminPanel/UserManagementTable";

const options = ["New Agreement"];




const managerRows = [
  {
    id: 1,
    status: "Pending",
    code: 123,
    name: "Pankaj",
    role: "Manager",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
  },
  {
    id: 2,
    status: "Active",
    code: 123,
    name: "John Doe",
    role: "Manager",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
  },
  {
    id: 3,
    status: "Pending",
    code: 123,
    name: "John Doe",
    role: "Manager",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
  },
  {
    id: 4,
    status: "Inactive",
    code: 123,
    name: "John Doe",
    role: "Manager",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
  },
  {
    id: 5,
    status: "Pending",
    code: 123,
    name: "John Doe",
    role: "Manager",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
  },
  {
    id: 6,
    status: "Pending",
    code: 123,
    name: "John Doe",
    role: "Manager",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
  },
  {
    id: 7,
    status: "Pending",
    code: 123,
    name: "John Doe",
    role: "Manager",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
  },
  {
    id: 8,
    status: "Pending",
    code: 123,
    name: "John Doe",
    role: "Manager",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
  },
  {
    id: 9,
    status: "Pending",
    code: 123,
    name: "John Doe",
    role: "Manager",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
  },
  
];

const srManagerRows = [
  {
    id: 1,
    status: "Pending",
    code: 123,
    name: "Pankaj",
    role: "Sr Manager",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
  },
  {
    id: 2,
    status: "Active",
    code: 123,
    name: "John Doe",
    role: "Sr Manager",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
  },
  {
    id: 3,
    status: "Pending",
    code: 123,
    name: "John Doe",
    role: "Sr Manager",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
  },
  {
    id: 4,
    status: "Inactive",
    code: 123,
    name: "John Doe",
    role: "Sr Manager",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
  },
  {
    id: 5,
    status: "Pending",
    code: 123,
    name: "John Doe",
    role: "Sr Manager",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
  },
  {
    id: 6,
    status: "Pending",
    code: 123,
    name: "John Doe",
    role: "Sr Manager",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
  },
  {
    id: 7,
    status: "Pending",
    code: 123,
    name: "John Doe",
    role: "Sr Manager",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
  },
  {
    id: 8,
    status: "Pending",
    code: 123,
    name: "John Doe",
    role: "Sr Manager",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
  },
  {
    id: 9,
    status: "Pending",
    code: 123,
    name: "John Doe",
    role: "Sr Manager",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
  },
  
];

const operationRow = [
  {
    id: 1,
    status: "Pending",
    code: 123,
    name: "Pankaj",
    role: "Operations",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
  },
  {
    id: 2,
    status: "Active",
    code: 123,
    name: "John Doe",
    role: "Operations",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
  },
  {
    id: 3,
    status: "Pending",
    code: 123,
    name: "John Doe",
    role: "Operations",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
  },
  {
    id: 4,
    status: "Inactive",
    code: 123,
    name: "John Doe",
    role: "Operations",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
  },
  {
    id: 5,
    status: "Pending",
    code: 123,
    name: "John Doe",
    role: "Operations",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
  },
  {
    id: 6,
    status: "Pending",
    code: 123,
    name: "John Doe",
    role: "Operations",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
  },
  {
    id: 7,
    status: "Pending",
    code: 123,
    name: "John Doe",
    role: "Operations",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
  },
  {
    id: 8,
    status: "Pending",
    code: 123,
    name: "John Doe",
    role: "Operations",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
  },
  {
    id: 9,
    status: "Pending",
    code: 123,
    name: "John Doe",
    role: "Operations",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
  },
  
];




function ApprovedList() {

    const [SelectValue, setSelectValue] = useState('Sr Manager')
    const [rows, setRows] = useState(srManagerRows)

     const handleChange = (e)=>{
        setSelectValue(e.target.value)
     }


     const dataChange = (value)=>{

            if(value === 'Sr Manager'){
                  setRows(srManagerRows)
            }
            if(value === 'Manager'){
                  setRows(managerRows)
            }
            if(value === 'Operations'){
                  setRows(operationRow)
            }
     }

useEffect(() => {
  dataChange(SelectValue)
}, [SelectValue])

  return (
    <>

<Stack sx={{flexWrap:"wap",flexDirection:"row"}}>

<HamburgerMenu/>
      <ListingComponent
        title="User Management"
        buttonText="Add User"
        options={options}
        onChange={handleChange}
        value={SelectValue}
        Table={UserManagementTable}
        rows={rows}
      />

</Stack>
    </>
  );
}

export default ApprovedList;