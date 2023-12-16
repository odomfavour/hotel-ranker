/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addHotel, updateHotel } from '../features/hotels/hotelSlice';
import { openGenModal } from '../features/modal/modalSlice';
import { useSelector } from 'react-redux';

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

const AddHotelModal = ({ showModal, handleClose, hotelToEdit }) => {
  const categories = useSelector((state) => state.categories);
  const [countries, setCountries] = useState([]);
  const [hotelInfo, setHotelInfo] = useState({
    name: '',
    country: '',
    address: '',
    rating: '',
    id: Date.now(),
    image: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!hotelInfo.name) errors.name = 'Please enter the hotel name';
    if (!hotelInfo.country) errors.country = 'Please select a country';
    if (!hotelInfo.address) errors.address = 'Please enter the hotel address';
    if (!hotelInfo.rating) errors.rating = 'Please select a rating';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (hotelToEdit) {
      setHotelInfo(hotelToEdit);
    }
  }, [hotelToEdit]);

  const handleEdit = () => {
    dispatch(updateHotel(hotelInfo));
    handleClose();
    dispatch(
      openGenModal({
        alertType: 'success',
        alertMessage: 'Hotel Editted Successfully',
      })
    );
  };

  const fetchCountries = async () => {
    try {
      const response = await fetch(
        'https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json'
      );
      const data = await response.json();

      const uniqueCountries = [...new Set(data.map((city) => city.country))];
      setCountries(uniqueCountries);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };
  useEffect(() => {
    fetchCountries();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onloadend = () => {
      setHotelInfo({
        ...hotelInfo,
        image: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(hotelInfo);
    if (validateForm()) {
      dispatch(addHotel(hotelInfo));
      setHotelInfo({
        name: '',
        country: '',
        address: '',
        rating: '',
        id: Date.now(),
        image: '',
      });
      handleClose();
      dispatch(
        openGenModal({
          alertType: 'success', // Replace with the actual alert type
          alertMessage: 'Hotel Added Successfully', // Replace with the actual message
        })
      );
    }
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
            {hotelToEdit ? 'Edit Hotel' : 'Add a Hotel'}
          </Typography>
          <Typography my="15px" fontWeight="300" color="#24a370">
            Please all the fields are required except the image upload field
          </Typography>
          <form onSubmit={hotelToEdit ? handleEdit : handleSubmit}>
            <TextField
              name="name"
              id="outlined-basic"
              label="Hotel Name"
              variant="outlined"
              style={{ width: '100%', marginBottom: 20 }}
              value={hotelInfo.name}
              onChange={(e) =>
                setHotelInfo({ ...hotelInfo, name: e.target.value })
              }
              error={Boolean(formErrors.name)}
              helperText={formErrors.name}
            />
            <FormControl fullWidth style={{ marginBottom: 20 }}>
              <InputLabel id="demo-simple-select-label">Country</InputLabel>
              <Select
                name="country"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={hotelInfo.country}
                label="Country"
                onChange={(e) =>
                  setHotelInfo({ ...hotelInfo, country: e.target.value })
                }
                error={Boolean(formErrors.country)}
                helperText={formErrors.country}
              >
                {countries.sort().map(
                  (
                    country,
                    index // Sort the countries
                  ) => (
                    <MenuItem key={index} value={country}>
                      {country}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
            <TextField
              name="address"
              id="outlined-basic"
              label="Address"
              variant="outlined"
              style={{ width: '100%', marginBottom: 20 }}
              value={hotelInfo.address}
              onChange={(e) =>
                setHotelInfo({ ...hotelInfo, address: e.target.value })
              }
              error={Boolean(formErrors.address)}
              helperText={formErrors.address}
            />
            <FormControl fullWidth style={{ marginBottom: 20 }}>
              <InputLabel id="rating-label">Rating</InputLabel>
              <Select
                name="rating"
                labelId="rating-label"
                id="rating-select"
                value={hotelInfo.rating}
                label="Rating"
                onChange={(e) =>
                  setHotelInfo({ ...hotelInfo, rating: e.target.value })
                }
                error={Boolean(formErrors.rating)}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <InputLabel htmlFor="image" style={{ marginBottom: 8 }}>
              Hotel Image
            </InputLabel>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              style={{ marginBottom: 20 }}
            />{' '}
            <Box
              sx={{ display: 'flex', justifyContent: 'flex-end', mt: '20px' }}
            >
              <Button
                variant="contained"
                sx={{ background: '#24a370' }}
                type="submit"
              >
                {hotelToEdit ? 'Save Changes' : 'Add Hotel'}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddHotelModal;
