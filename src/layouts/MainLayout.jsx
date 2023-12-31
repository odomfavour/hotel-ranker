import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Box } from '@mui/material';

const MainLayout = ({ children }) => {
  return (
    <Box sx={{ position: 'relative' }}>
      <Header />
      <Box pb="100px">{children}</Box>
      <Footer />
    </Box>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
