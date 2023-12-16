import { useState } from 'react';
import { Box, Grid, Container, Button, Typography, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import hotelImage from '../images/hotel.jpg';
import AddHotelModal from '../components/AddHotelModal';
import { FaPlus, FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa6';
import { BsStarFill, BsStar } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { deleteHotel } from '../features/hotels/hotelSlice';
import { deleteCategory } from '../features/categories/categoriesSlice';
import { openGenModal, closeGenModal } from '../features/modal/modalSlice';
import AddCategoriesModal from '../components/AddCategoriesModal';
import MainLayout from '../layouts/MainLayout';
import AlertModal from '../components/AlertModal';

const Index = () => {
  const hotels = useSelector((state) => state.hotels);
  const modal = useSelector((state) => state.modal);
  const categories = useSelector((state) => state.categories);
  const [openModal, setOpenModal] = useState(false);
  const [hotelToEdit, setHotelToEdit] = useState(null);
  const [filter, setFilter] = useState('all');
  const dispatch = useDispatch();

  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  const filterOptions = [
    { label: 'View All', value: 'all' },
    ...categories.map((category) => ({
      label: `${category.value} star`,
      value: category.value,
    })),
  ];
  filterOptions.sort((a, b) => {
    if (a.value === 'all') {
      return -1; // 'View All' comes first
    } else if (b.value === 'all') {
      return 1; // 'View All' comes first
    } else {
      return a.value.localeCompare(b.value);
    }
  });
  console.log(hotels);

  const filteredHotels = hotels.filter((hotel) => {
    if (filter === 'all') return true;
    return hotel.rating.toString() === filter;
  });

  const handleEditClick = (hotel) => {
    setHotelToEdit(hotel);
    setOpenModal(true);
  };

  const handleCategoryEditClick = (hotel) => {
    setCategoryToEdit(hotel);
    setOpenCategoryModal(true);
  };

  return (
    <MainLayout>
      <Box style={{ position: 'relative' }}>
        <Box
          sx={{
            backgroundImage: `linear-gradient( 45deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${hotelImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: '60vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            color="#ffffff"
            sx={{
              fontSize: { md: '40px', sm: '30px', xs: '20px', lg: '40px' },
            }}
          >
            Find and Rate Hotels
          </Typography>
        </Box>
        <Container>
          <div>
            <h2>Hotel List</h2>
            <p>Filter</p>
            {filterOptions.map((option) => (
              <Button
                key={option.value}
                onClick={() => setFilter(option.value)}
                style={{
                  background: filter === option.value ? '#24ab70 ' : '',
                  marginRight: '8px',
                  color: filter === option.value ? '#ffffff ' : '#222222',
                }}
              >
                {option.label}
              </Button>
            ))}
            {filteredHotels.length > 0 && (
              <Grid container spacing={2} mt="30px" style={{ height: '100%' }}>
                {filteredHotels.map((hotel) => {
                  return (
                    <Grid item xs={12} sm={6} lg={4} md={4} key={hotel.id}>
                      <Box
                        sx={{
                          border: '1px solid #ccc',
                          borderRadius: '8px',
                        }}
                      >
                        <Box
                          sx={{
                            backgroundImage: `${
                              hotel.image === ''
                                ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`
                                : `url(${hotel.image})`
                            }`,
                            color: '#ffffff',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8,
                            boxShadow:
                              '0 4px 6px rgba(0, 0, 0, 0.1), 0 6px 8px rgba(0, 0, 0, 0.1)',
                            width: '100%',
                            height: 200,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          {hotel?.image == '' && (
                            <Typography>No Image set</Typography>
                          )}
                        </Box>

                        <Box sx={{ padding: '20px' }}>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              flexDirection: {
                                lg: 'row',
                                md: 'row',
                                sm: 'row',
                                xs: 'column-reverse',
                              },
                            }}
                          >
                            <Typography color="#24AB70" fontSize="14px">
                              {hotel.address.length > 25
                                ? `${hotel.address.substring(0, 20)}...`
                                : hotel.address}
                            </Typography>

                            <Box className="flex">
                              {[...Array(Math.round(hotel.rating))].map(
                                (e, i) => (
                                  <BsStarFill key={i} color="#F95F5F" />
                                )
                              )}

                              {[...Array(5 - Math.round(hotel.rating))].map(
                                (e, i) => (
                                  <BsStar key={i} color="#F95F5F" />
                                )
                              )}
                            </Box>
                          </Box>
                          <Typography
                            fontSize="24px"
                            fontWeight="500"
                            color="#222222"
                          >
                            {hotel.name.length > 25
                              ? `${hotel.name.substring(0, 20)}...`
                              : hotel.name}
                          </Typography>
                          <Typography color="#22222290">
                            {hotel.country}
                          </Typography>
                          <Stack
                            spacing={{ xs: 1, sm: 2 }}
                            direction="row"
                            useFlexGap
                            flexWrap="wrap"
                            my="20px"
                          >
                            <FaTrash
                              role="button"
                              fontSize="20px"
                              color="#22222298"
                              onClick={() => {
                                dispatch(deleteHotel(hotel));
                                dispatch(
                                  openGenModal({
                                    alertType: 'success',
                                    alertMessage: 'Hotel Deleted Successfully',
                                  })
                                );
                              }}
                              cursor="pointer"
                            />
                            <FaEdit
                              role="button"
                              fontSize="20px"
                              color="#22222298"
                              onClick={() => handleEditClick(hotel)}
                              cursor="pointer"
                            />
                          </Stack>

                          <Link
                            to={`/hotels/${hotel.id}`}
                            style={{ color: '#222222' }}
                          >
                            View Details
                          </Link>
                        </Box>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            )}
            {filteredHotels.length < 1 && (
              <Typography
                textAlign="center"
                mt="30px"
                fontSize="18px"
                fontWeight="300"
              >
                There are no hotels rated this star
              </Typography>
            )}

            <Box mt="30px" mb="60px">
              <Typography
                fontSize="24px"
                fontWeight="600"
                color="#222222"
                mb="15px"
              >
                Available Categories
              </Typography>
              <Typography fontSize="18px" fontWeight="300" color="#222222">
                We have three default categories but you can create your
                category
              </Typography>
              <Grid container spacing={2} my="20px">
                {categories.map((category) => (
                  <Grid item lg={1} sm={2} xs={4} md={1} key={category.id}>
                    <Typography fontSize="24px" fontWeight="600">
                      {category.label}
                    </Typography>
                    {category.value > 3 && (
                      <Stack
                        spacing={{ xs: 1, sm: 2 }}
                        direction="row"
                        useFlexGap
                        flexWrap="wrap"
                      >
                        <FaTrash
                          role="button"
                          fontSize="20px"
                          onClick={() => {
                            dispatch(deleteCategory(category));
                            dispatch(
                              openGenModal({
                                alertType: 'success',
                                alertMessage: 'Category Deleted Successfully',
                              })
                            );
                          }}
                          cursor="pointer"
                        />
                        <FaEdit
                          role="button"
                          fontSize="20px"
                          onClick={() => handleCategoryEditClick(category)}
                          cursor="pointer"
                        />
                      </Stack>
                    )}
                  </Grid>
                ))}
              </Grid>
              <Button
                variant="outlined"
                sx={{ color: '#222222' }}
                color="success"
                onClick={() => setOpenCategoryModal(true)}
              >
                Create category
              </Button>
            </Box>
          </div>

          <Box
            sx={{
              position: 'fixed',
              bottom: '60px',
              right: { xs: '20px', sm: '20px', md: '20px', lg: '20px' },
            }}
          >
            <Button
              sx={{
                width: { lg: '80px', md: '80px', sm: '40px', xs: '40px' },
                height: { lg: '80px', md: '80px', sm: '60px', xs: '60px' },
                borderRadius: '50%',
                background: '#24ab70',
                boxShadow: '0px 8px 8px 0 rgba(34, 34, 34, 0.4)',
                '&:hover': {
                  backgroundColor: '#208e63', // Change the background color on hover
                  boxShadow: '0px 8px 8px 0 rgba(34, 34, 34, 0.6)', // Adjust the boxShadow on hover
                },
              }}
              onClick={() => setOpenModal(true)}
            >
              <FaPlus
                style={{
                  fontSize: { md: '24px', sm: '18px', xs: '12px' },
                  color: 'white',
                }}
              />
            </Button>
          </Box>
        </Container>
        <AddHotelModal
          showModal={openModal}
          handleClose={() => setOpenModal(false)}
          hotelToEdit={hotelToEdit}
        />
        <AddCategoriesModal
          showModal={openCategoryModal}
          handleClose={() => setOpenCategoryModal(false)}
          categoryToEdit={categoryToEdit}
        />
        <AlertModal
          isOpen={modal.isOpen}
          handleClose={() => dispatch(closeGenModal())}
          alertType={modal.alertType}
          alertMessage={modal.alertMessage}
        />
      </Box>
    </MainLayout>
  );
};

export default Index;
