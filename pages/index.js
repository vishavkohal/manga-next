// Assuming the Navbar component is meant to be used here and has been moved to an appropriate directory
import NavBar from '../pages/data/NavBar';
import { StyledEngineProvider } from '@mui/material/styles';
import Home from '../pages/data/home.js';
import React from 'react';


export default function HomePage() {
  return (
    <StyledEngineProvider injectFirst>
      <NavBar />
      <Home/>
    </StyledEngineProvider>
  );
}
