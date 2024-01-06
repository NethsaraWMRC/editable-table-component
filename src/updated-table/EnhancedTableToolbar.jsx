import { IconButton, Toolbar, Tooltip, Typography, alpha } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import React from 'react';
import PropTypes from 'prop-types';

function EnhancedTableToolbar(props) {
    const { numSelected } = props;

    const handleDeleteClick = () => {
      props.handleDelete();
    };
  
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Leads
          </Typography>
        )}
  
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <>
            
          </>
        )}
      </Toolbar>
    );
  }
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired, // Assuming numSelected is a number, adjust if it's a different type
    handleDelete: PropTypes.func.isRequired,
  };

export default EnhancedTableToolbar
