import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Index';

import HotelDetailPage from './pages/hotelDetailPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels/:id" element={<HotelDetailPage />} />
      </Routes>
    </>
  );
}

export default App;
