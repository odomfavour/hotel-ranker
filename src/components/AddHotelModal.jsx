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
    image: {},
  });
  //   const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();

  //   const handleOpen = () => setOpen(true);
  //   const handleClose = () => setOpen(false);
  useEffect(() => {
    if (hotelToEdit) {
      // If editing an existing hotel, populate the form with its details
      setHotelInfo(hotelToEdit);
    }
  }, [hotelToEdit]);

  const handleEdit = () => {
    dispatch(updateHotel(hotelInfo));
    handleClose();
  };

  const fetchCountries = async () => {
    try {
      const response = await fetch(
        'https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json'
      );
      const data = await response.json();
      // Extract unique countries from the data
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
        image: reader.result, // Set the image data directly
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(hotelInfo);
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
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
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
              >
                {countries.map((country, index) => (
                  <MenuItem key={index} value={country}>
                    {country}
                  </MenuItem>
                ))}
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
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.value}>
                    {category.label} {category.id}
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
              <Button variant="contained" type="submit">
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
