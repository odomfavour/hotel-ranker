import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Box, Container, Typography, IconButton } from '@mui/material';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { FaArrowLeftLong } from 'react-icons/fa6';
import MainLayout from '../layouts/MainLayout';

const DetailPage = () => {
  const { id } = useParams();
  const hotel = useSelector((state) =>
    state.hotels.find((hootel) => hootel.id === parseInt(id))
  );

  if (!hotel) {
    return <div>Hotel not found</div>;
  }

  return (
    <MainLayout>
      <Box pt="30px">
        <Container>
          <IconButton component={Link} to="/" aria-label="Back">
            <FaArrowLeftLong />
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { md: 'row', sm: 'column', xs: 'column' },
              justifyContent: { md: 'space-between' },
              alignItems: { md: 'center', sm: 'flex-start', xs: 'flex-start' },
              my: '30px',
            }}
          >
            <Box>
              <Typography
                sx={{ fontSize: { md: '40px', sm: '30px', xs: '20px' } }}
              >
                {hotel.name}
              </Typography>
              <Typography color="#24AB70" fontSize="14px">
                {hotel.address}
              </Typography>
              <Typography>{hotel.country}</Typography>
            </Box>
            <Box>
              <Typography
                sx={{ fontSize: { md: '40px', sm: '30px', xs: '20px' } }}
                color="#24a370"
              >
                {hotel.rating}
              </Typography>
              <Box className="flex">
                {[...Array(Math.round(hotel.rating))].map((e, i) => (
                  <BsStarFill key={i} color="#F95F5F" />
                ))}

                {[...Array(5 - Math.round(hotel.rating))].map((e, i) => (
                  <BsStar key={i} color="#F95F5F" />
                ))}
              </Box>
            </Box>
          </Box>
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
              height: { lg: ' 500px', md: '450px', sm: '300px', xs: '200px' },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {hotel?.image == '' && (
              <Typography
                sx={{ fontSize: { md: '40px', sm: '18px', xs: '16px' } }}
              >
                No Image set
              </Typography>
            )}
          </Box>

          <Box>
            <Typography fontSize="30px" my="30px">
              Hotel Detail
            </Typography>
            <Typography
              fontSize="18px"
              mb="30px"
              textAlign="center"
              fontWeight="300"
            >
              Detail coming shortly
            </Typography>
          </Box>
        </Container>
      </Box>
    </MainLayout>
  );
};

export default DetailPage;
