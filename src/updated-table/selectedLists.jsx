import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import { css } from '@emotion/react';

  
  const colors = [
    {id:1,code:'#F4CE14'},
    {id:2,code:'#FF8080'},
    {id:3,code:'#9ADE7B'},
  ]
  
  
  const SelectedBox = ({ data }) => {
    const [selectedIndex, setSelectedIndex] = useState(); // State to track selected index
    const [hoveredIndex, setHoveredIndex] = useState(null);
  
    const handleSelectChange = (event) => {
      setSelectedIndex(event.target.value); // Update selected index on change
    };
  
    const handleMouseEnter = (index) => {
      setHoveredIndex(index); // Set hovered index on mouse enter
    };
  
    const handleMouseLeave = () => {
      setHoveredIndex(null); // Reset hovered index on mouse leave
    };
  
    return (
      <Box>
        <FormControl>
          <Select
            sx={{ s: 1, minWidth: 200 }}
            style={{
              height: '35px',
              backgroundColor:
                selectedIndex !== -1
                  ? colors[selectedIndex % colors.length]?.code
                  : '',
            }}
            value={selectedIndex}
            onChange={handleSelectChange}
          >
            {data.map((item, index) => (
              <MenuItem
                key={item.id}
                value={index}
                style={{
                  backgroundColor: colors[index % colors.length]?.code,
                  marginBottom: '5px',
                  margin: '0 10px 10px 10px',
                  ...(hoveredIndex === index && { opacity: 0.8 }),
                }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <span
                  style={{
                    backgroundColor: colors[index % colors.length]?.code,
                    padding: '1px',
                  }}
                >
                  {item.name}
                </span>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  };
  
  export default SelectedBox;