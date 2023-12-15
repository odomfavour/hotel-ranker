/* eslint-disable react/prop-types */
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import {
  addCategory,
  editCategory,
} from '../features/categories/categoriesSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { sm: '70%', md: '45%', lg: '45%', xs: '70%' },
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 5,
  p: '30px',
};

const AddCategoriesModal = ({ showModal, handleClose, categoryToEdit }) => {
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState(
    categoryToEdit ? categoryToEdit.label : ''
  );
  const [categoryValue, setCategoryValue] = useState(
    categoryToEdit ? categoryToEdit.value : ''
  );

  const handleSave = () => {
    const categoryData = {
      label: categoryName,
      value: categoryValue,
      id: categoryValue,
    };

    if (categoryToEdit) {
      dispatch(
        editCategory({ oldCategory: categoryToEdit, newCategory: categoryData })
      );
    } else {
      dispatch(addCategory(categoryData));
    }
    handleClose();
  };

  return (
    <div>
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            mb="20px"
          >
            {categoryToEdit ? 'Edit Category' : 'Add Category'}
          </Typography>
          <form onSubmit={handleSave}>
            <TextField
              autoFocus
              margin="dense"
              label="Category Label"
              fullWidth
              placeholder="4 star"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Category Value"
              fullWidth
              placeholder="4"
              value={categoryValue}
              onChange={(e) => setCategoryValue(e.target.value)}
            />
            <Box
              sx={{ display: 'flex', justifyContent: 'flex-end', mt: '20px' }}
            >
              <Button variant="contained" type="submit">
                {categoryToEdit ? 'Save Changes' : 'Add Category'}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddCategoriesModal;
