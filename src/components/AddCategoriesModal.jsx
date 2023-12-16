import { useState, useEffect } from 'react';
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
import { openGenModal } from '../features/modal/modalSlice';
import PropTypes from 'prop-types';

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
  const [category, setCategory] = useState({
    label: '',
    value: '',
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (categoryToEdit) {
      setCategory({
        label: categoryToEdit.label,
        value: categoryToEdit.value,
      });
    } else {
      setCategory({
        label: '',
        value: '',
      });
    }
  }, [categoryToEdit]);

  const validateForm = () => {
    const errors = {};

    if (!category.label.trim()) {
      errors.label = 'Category Label is required';
    }

    if (!category.value.trim()) {
      errors.value = 'Category Value is required';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // If there are validation errors, prevent form submission
      return;
    }

    const categoryData = {
      label: category.label,
      value: category.value,
      id: category.value, // Consider using a more reliable way to generate an ID
    };

    if (categoryToEdit) {
      dispatch(
        editCategory({ oldCategory: categoryToEdit, newCategory: categoryData })
      );
      dispatch(
        openGenModal({
          alertType: 'success',
          alertMessage: 'Category Editted Successfully',
        })
      );
    } else {
      dispatch(addCategory(categoryData));
      dispatch(
        openGenModal({
          alertType: 'success',
          alertMessage: 'Category Added Successfully',
        })
      );
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
          <Typography my="15px" fontWeight="300" color="#24a370">
            Please follow this convention: Category Label: 3 Star, Category
            Value: 3
          </Typography>
          <form onSubmit={handleSave}>
            <TextField
              autoFocus
              margin="dense"
              label="Category Label"
              fullWidth
              placeholder="4 star"
              value={category.label}
              onChange={(e) =>
                setCategory((prevCategory) => ({
                  ...prevCategory,
                  label: e.target.value,
                }))
              }
              error={formErrors.label}
              helperText={formErrors.label}
            />
            <TextField
              margin="dense"
              label="Category Value"
              fullWidth
              placeholder="4"
              value={category.value}
              onChange={(e) =>
                setCategory((prevCategory) => ({
                  ...prevCategory,
                  value: e.target.value,
                }))
              }
              error={formErrors.value}
              helperText={formErrors.value}
            />
            <Box
              sx={{ display: 'flex', justifyContent: 'flex-end', mt: '20px' }}
            >
              <Button
                variant="contained"
                type="submit"
                sx={{ background: '#24a370' }}
              >
                {categoryToEdit ? 'Save Changes' : 'Add Category'}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

AddCategoriesModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  categoryToEdit: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
    // Add other properties if needed
  }),
};

export default AddCategoriesModal;
