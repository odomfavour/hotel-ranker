import { Typography, Box, Container } from '@mui/material';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Box sx={{ py: '20px', background: '#24ab70', color: '#ffffff' }}>
      <Container>
        <Typography textAlign="center">
          Copyright &copy; hotel ranking {currentYear}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
