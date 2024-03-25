import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Link from 'next/link';
import home from '../../assets/index.jpg';


export default function Home() {

    return(
<Box
component="main"
sx={{ 
  flexGrow: 1, 
  p: 3, 
  minHeight: '100vh', 
  backgroundImage: `url(${home.src})`, 
  backgroundSize: 'cover', 
  backgroundPosition: 'center'
}}
>
<Toolbar />
<Paper elevation={6} sx={{maxWidth: 600, margin: 'auto', p: 3, backgroundColor: 'rgba(255, 255, 255, 0.7)'}}>
  <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'black', textAlign: 'center' }}>
    Welcome to MangaZone
  </Typography>
  <Typography paragraph sx={{ color: 'black' }}>
    Explore the world of manga with us. Dive into the latest releases, discover hidden gems, and revisit the classics that shaped the genre. 
  </Typography>
</Paper>
</Box>
    );
};