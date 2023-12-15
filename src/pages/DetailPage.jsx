import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Box, Container, Typography, IconButton } from '@mui/material';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { FaArrowLeftLong } from 'react-icons/fa6';
import MainLayout from '../layouts/MainLayout';

const DetailPage = () => {
  const { id } = useParams();
  const hotel = useSelector((state) =>
    state.hotels.find((h) => h.id === parseInt(id))
  );

  if (!hotel) {
    return <div>Hotel not found</div>;
  }

  return (
    <MainLayout>
      <Box>
        <Container>
          <IconButton component={Link} to="/" aria-label="Back">
            <FaArrowLeftLong />
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: '30px',
            }}
          >
            <Box sx={{ mb: '30px' }}>
              <Typography fontSize="40px">{hotel.name}</Typography>
              <Typography color="#24AB70" fontSize="14px">
                {hotel.address}
              </Typography>
              <Typography>{hotel.country}</Typography>
              <Typography>Rating: {hotel.rating}</Typography>
            </Box>

            <Box className="flex">
              {[...Array(Math.round(hotel.rating))].map((e, i) => (
                <BsStarFill key={i} color="#F95F5F" />
              ))}

              {[...Array(5 - Math.round(hotel.rating))].map((e, i) => (
                <BsStar key={i} color="#F95F5F" />
              ))}
            </Box>
          </Box>

          <img
            src={hotel.image}
            alt={hotel.name}
            style={{ height: '500px', width: '100%', objectFit: 'cover' }}
          />

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
