import { TableCell } from '@mui/material';
import PropTypes from 'prop-types';

const EditableCell = ({
    rowId,
    columnId,
    value,
    editedValue,
    editingCell,
    handleCellClick,
    handleInputChange,
    handleInputBlur,
    handleInputKeyPress,
    alignText
  }) => {
    return (
      <TableCell
        component="th"
        scope="row"
        padding="none"
        onClick={() => handleCellClick(rowId, value, columnId)}
        align={alignText}
        style={{borderWidth:0}}
  
      >
        {editedValue && editingCell.rowId === rowId && editingCell.columnId === columnId ? (
          <input
            style={{
                padding:'5px',
                borderRadius:"5px",
                
                outline: 'none',
                
            }}
            value={editedValue}
            onChange={(event) => handleInputChange(event)}
            onBlur={(event) => handleInputBlur(event, rowId, columnId)}
            onKeyPress={(event) => handleInputKeyPress(event, rowId, columnId)}
            autoFocus
          />
        ) : (
          value
        )}
      </TableCell>
    );
  };

  EditableCell.propTypes = {
    rowId: PropTypes.any.isRequired, // Update the PropTypes type accordingly
    columnId: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
    editedValue: PropTypes.any.isRequired,
    editingCell: PropTypes.object.isRequired,
    handleCellClick: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleInputBlur: PropTypes.func.isRequired,
    handleInputKeyPress: PropTypes.func.isRequired,
    alignText: PropTypes.string.isRequired // Update the PropTypes type accordingly
  };
  
export default EditableCell
