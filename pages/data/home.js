import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import home from '../../assets/index.jpg';
import { useRouter } from 'next/router';
// Sample genres list "Pornographic",Erotica", "Smut",
const genres = [
  "Action", "Adventure", "Comedy", "Cooking", "Doujinshi", "Drama",
  "Fantasy", "Harem", "Historical", "Horror",
  "Isekai", "Josei", "Manhua", "Manhwa", "Martial arts", "Mature",
  "Mecha", "Medical", "Mystery", "One shot", 
  "Psychological", "Romance", "School life", "Sci fi", "Seinen",
  "Shoujo", "Shoujo ai", "Shounen", "Shounen ai", "Slice of life",
  "Sports", "Supernatural", "Tragedy", "Webtoons"
];
export default function Home() {

const router= useRouter();
function handleGenreClick(genre) {
  console.log(`Clicked on ${genre}`);
  router.push(`/latestmanga?type=${genre}`);
}


  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        minHeight: '100vh',
        backgroundImage: `url(${home.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Toolbar />
      <Paper elevation={6} sx={{ maxWidth: 600, margin: 'auto', p: 3, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'black', textAlign: 'center' }}>
          Welcome to MangaZone
        </Typography>
        <Typography paragraph sx={{ color: 'black' }}>
          Explore the world of manga with us. Dive into the latest releases, discover hidden gems, and revisit the classics that shaped the genre.
        </Typography>
        <Grid container spacing={1} sx={{ marginTop: 2, justifyContent: "center" }}>
          {genres.map((genre, index) => (
            <Grid item key={index}>
              <Chip
                label={genre}
                clickable
                onClick={() => handleGenreClick(genre)}
                variant="outlined"
                sx={{
                  margin: 0.5,
                  borderColor: 'rgba(0, 0, 0, 0.87)', // Darker border
                  borderWidth: '0.4px',
                  '&:hover': {
                    transform: 'scale(1.1)', // Zoom effect on hover
                    transition: 'transform 0.3s', // Smooth transition
                  }
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};
