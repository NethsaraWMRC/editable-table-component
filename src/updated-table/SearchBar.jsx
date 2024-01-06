import React from "react";
import { TextField } from "@mui/material";

export default function SearchBar({ value, onChange }) {
  return (
    <div>
      <TextField
        id="filled-basic"
        label="Search"
        variant="standard"
        sx={{ marginLeft: "10%", width: "80%", marginTop: "20px" }}
        color="warning"
        value={value} // Set the value prop
        onChange={onChange} // Set the onChange prop
      />
    </div>
  );
}
