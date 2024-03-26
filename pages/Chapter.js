// components/MangaInfo.js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Container,Box,CircularProgress } from '@mui/material';
import { CardMedia, Chip,FormControl, InputLabel, Select,MenuItem, Button,useMediaQuery, useTheme } from '@mui/material';
import '../app/globals.css';
import Navbar from './data/NavBar'
export default function MangaInfo() {
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [mangaDetails, setMangaDetails] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(''); // F
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const { chapterId } = router.query;
    const [isReadMore, setIsReadMore] = useState(true);
  
    // Hook to check for screen size, to show/hide additional information automatically
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchMangaDetails = async () => {
      try {
        const response = await axios.get(`/api/ChapterInfo?chapterId=${chapterId}`);
        setMangaDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch manga details", error);
      }
    };

    fetchMangaDetails();
  }, [chapterId]);

  const toggleDetails = () => {
    setShowMoreDetails(!showMoreDetails);
  };
  
  const handleChapterChange = (event) => {
    const chapterId = event.target.value;
    setSelectedChapter(chapterId);

    // Example of navigating to a chapter detail page (adjust URL/path as needed)
    router.push({
      pathname: '/MangaChapterViewer',
      query: { chapterId },
    });
  };

  const handleClick = (chapterId) => {
    // Using router to navigate programmatically to the desired URL
    router.push({
      pathname: '/MangaChapterViewer',
      query: { chapterId },
    });
  };

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  if (!mangaDetails) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  
  return (
    <div style={{backgroundColor: '#070c13'}}>
      <Navbar></Navbar>
    <Container style={{backgroundColor: '#070c13', color: 'white', padding: '100px', borderRadius: '5px'}}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              alt={mangaDetails.title}
              height="auto"
              image={mangaDetails.img}
            />
          </Card>
        </Grid>
        
        <Grid item xs={12} md={8} sx={{ paddingInline: { xs: '0px', md: '50px' }}}>
    <Typography variant="h3" gutterBottom>{mangaDetails.title}</Typography>
    <Typography variant="body1">Alternative Titles: {mangaDetails.alternative.join(', ')}</Typography>
    <Typography variant="body1">Authors: {mangaDetails.authors.join(', ')}</Typography>
    <Typography variant="body1">Status: {mangaDetails.status}</Typography>
    {(!isReadMore || !isSmallScreen) && (
            <>
    <Typography variant="body1">Last Updated: {mangaDetails.lastUpdate}</Typography>
    <Typography variant="body1">Views: {mangaDetails.view}</Typography>
    <Typography variant="body1">Rating: {mangaDetails.rate}</Typography>
    <Typography variant="body1">Votes: {mangaDetails.votes}</Typography>
    <Typography variant="body1">Summary: {mangaDetails.summary}</Typography>
    <Typography variant="body1" gutterBottom>Genres:</Typography>
    <Grid container spacing={1}>
        {mangaDetails.genres.map((genre, index) => (
            <Grid item key={index}>
                <Chip label={genre} variant="outlined" sx={{
                margin: 0.5,
                borderColor: 'white', 
                '& .MuiChip-label': {color: 'white'},// Darker border
                }}/>
            </Grid>
        ))}
      
    </Grid>
    </>
          )}
</Grid>

      </Grid>
      {(isSmallScreen) &&
      <Button onClick={toggleReadMore} style={{ color: 'white', border: '1px solid #ffffff', marginTop: '15px' }}>
            {isReadMore ? 'Read More' : 'Show Less'}
          </Button>}
      <Grid container spacing={2} alignItems="center" className="pt-8">
        {/* Chapter Heading */}
        <Grid item xs={12} sm={6}>
          <Typography variant="h4" component="h2" gutterBottom>
            Chapters
          </Typography>
        </Grid>
        <br></br>
        {/* Chapter Dropdown */}
        <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" style={{minWidth: 120,float:'right'}}>
            <InputLabel id="chapter-select-label"  style={{ color: '#ffffff' }}>Chapter</InputLabel>
            <Select
              labelId="chapter-select-label"
              id="chapter-select"
              value={selectedChapter}
              onChange={handleChapterChange}
              label="Chapter"
              style={{
                color: '#ffffff',  // Text color for better visibility
                backgroundColor: 'black',  // A darker background that contrasts with the text color
                border: '1px solid #ffffff',
                borderRadius:'20px' // Optional: adds a border that makes the element stand out
              }}
            >
              {mangaDetails.chapters.map((chapter, index) => (
                <MenuItem key={chapter.chapterID} value={chapter.chapterID}>
                  {"Chapter " + (mangaDetails.chapters.length - index)} {/* Update the label to reflect correct order */}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <br></br>
      <Grid container spacing={3}>
        {mangaDetails.chapters.map((chapter, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} className="hover:scale-105 transition-transform duration-200">
            <Card raised onClick={() => handleClick(chapter.chapterID)}  className="cursor-pointer" sx={{borderRadius:'30px', backgroundColor:'black','&:hover': {
                  transform: 'scale(1.1)', // Zoom effect on hover
                  transition: 'transform 0.3s', // Smooth transition
                }}}>
              <CardContent>
              <Typography variant="h6" component="h2" color="white">
                    Chapter {mangaDetails.chapters.length - index}
                  </Typography>
              <Chip label={`Views: ${chapter.views}`  }
              variant="outlined"
              sx={{
                margin: 0.5,
                borderColor: 'white', 
                '& .MuiChip-label': {color: 'white'},// Darker border
                }}
                />
                  <Chip label={`Uploaded: ${chapter.timeUploaded}`}  variant="outlined"
              sx={{
                margin: 0.5,
                borderColor: 'white', 
                '& .MuiChip-label': {color: 'white'},// Darker border
                }}/>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    </div>
  );}