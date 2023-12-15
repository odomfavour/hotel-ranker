import { Link } from 'react-router-dom';
import { Box, Container } from '@mui/material';

const Header = () => {
  return (
    <Box
      position="static"
      sx={{
        background: '#ffffff',
        py: '20px',
        boxShadow:
          'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px',
      }}
    >
      <Container>
        <Link
          to="/"
          color="#222222"
          style={{ color: '#222222', fontSize: '24px', textDecoration: 'none' }}
        >
          Hotel Ranking
        </Link>
      </Container>
    </Box>
  );
};

export default Header;
