import React from "react";
import { TextField, InputAdornment, InputLabel } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ value, onChange }) {
  return (
    <div>
      <TextField
        id="searchBar"
        variant="outlined"
        label="Search"
        sx={{ width: "80%", marginTop: "2%", marginLeft: "2%" }}
        color="warning"
        value={value} // Set the value prop
        onChange={onChange} // Set the onChange prop
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}
