import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Container, Typography, Grid, Card, CardMedia, CardContent, ButtonBase } from '@mui/material';
import '../app/globals.css';
import Navbar from './data/NavBar';
import { useRouter } from 'next/router';
export default function MangaList() {
  const [mangaList, setMangaList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/api/latest-releases');
        const data = await response.json();
        setMangaList(data.results);
      } catch (error) {
        console.error("Failed to fetch manga list", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const GetManga = (chapterId) => {
    // Using router to navigate programmatically to the desired URL
    router.push(`/Chapter?chapterId=${chapterId}`);
  };
  // Function to be called when clicking on a chapter
  const handleChapterClick = (chapter) => {
    
  
    const chapterPath = `${chapter}`;
    const encodedChapterPath = encodeURIComponent(chapterPath);
  
    router.push(`/MangaChapterViewer?chapterId=${encodedChapterPath}`);
  };
  




  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div style={{ backgroundColor: '#070c13' }}>
      <Navbar />
      <Container maxWidth="lg" style={{ backgroundColor: '#070c13', color: 'white', padding: '20px', borderRadius: '5px', backgroundImage: 'url(/path/to/your/background/image.jpg)' }}>
        <Box sx={{ flexGrow: 1, p: 4, bgcolor: '#070c13', color: 'text.primary' }}>
          <Typography variant="h4" component="h1" textAlign="center" mb={8} fontWeight="bold" color="whitesmoke">
            Latest Manga Updates
          </Typography>
          <Grid container spacing={3}>
            {mangaList.map((manga, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3} className="hover:scale-105 transition-transform duration-200">
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#070c13' }}>
                  <CardMedia
                    component="img"
                    image={manga.img}
                    alt={manga.title}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      className="font-bold text-xl mb-2 cursor-pointer" color="white"
                      onClick={() => GetManga(manga.id)}>
                      {manga.title}
                    </Typography>
                    {manga.chapters.slice(0, 3).map((chapter, idx) => (
                      <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <ButtonBase sx={{ justifyContent: 'start', width: '100%' }} onClick={() => handleChapterClick(chapter.chapterID)}>
                          <Typography variant="body2" color="grey" flexGrow={1} mr={1} noWrap>
                            {chapter.chapter}
                          </Typography>
                          <Typography variant="body2" color="grey" whiteSpace="nowrap">
                            {chapter.update}
                          </Typography>
                        </ButtonBase>
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
