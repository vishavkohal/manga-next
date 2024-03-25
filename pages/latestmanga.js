import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Container from '@mui/material/Container';
// Material UI components
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography, CircularProgress, Grid, Button } from '@mui/material';
import '../app/globals.css';
import Navbar from './data/NavBar'
export default function MangaPage() {
    const [mangas, setMangas] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const router = useRouter();

    const handleClick = (chapterId) => {
        console.log(chapterId)
        router.push({
          pathname: '/MangaChapterViewer',
          query: { chapterId },
        });
      };

      const GetManga = (chapterId) => {
        // Using router to navigate programmatically to the desired URL
        router.push(`/Chapter?chapterId=${chapterId}`);
      };


    useEffect(() => {
       
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/latestManga?page=1');
                setMangas(response.data.results);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data: ', error);
                setLoading(false);
            }
        };
    
        fetchData();
      
    }, []);

    if (loading) return <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh"><CircularProgress /></Box>;

    return (
        <div style={{backgroundColor: '#070c13'}}>
        <Navbar/>
        <Container maxWidth="lg" style={{backgroundColor: '#070c13', color: 'white', padding: '20px', borderRadius: '5px', backgroundImage:'url(C:\Users\visha\Downloads\MangaNext\manga-next\assets\index.jpg)'}}>
        
        <Box sx={{ flexGrow: 1, p: 4, bgcolor: '#070c13', color: 'text.primary' }}>
            
            <Typography variant="h4" component="h1" textAlign="center" mb={8} fontWeight="bold" color="whitesmoke">
                Latest Manga Updates
            </Typography>
            <Grid container spacing={3}>
                {mangas.map((manga, index) => (
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
      variant="h4"
      component="div"
      className="font-bold text-xl mb-2 cursor-pointer" color={'white'}  onClick={() => GetManga(manga.mangaID)}>
                                        {manga.title}
                                    </Typography>
                                    <Typography variant="body2" color="grey">
                                        {manga.description ? manga.description.substring(0, 100) : "No description available."}...
                                    </Typography>
                                </CardContent>
                            
                            <Box p={1}>
                          
                    <a href="#!" onClick={() => handleClick(manga.chapterID)} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #{manga.latestChapter}
        </a>
      
                        
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
        </Container>
        </div>
    );
}
