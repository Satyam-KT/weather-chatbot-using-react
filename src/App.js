import React from 'react';
import Chatbot from './components/Chatbot';
import { Box } from '@mui/material';
import backgroundImage from './assets/background.jpg'; // Make sure to add an appropriate image to your src/assets directory

const App = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Chatbot />
    </Box>
  );
};

export default App;
