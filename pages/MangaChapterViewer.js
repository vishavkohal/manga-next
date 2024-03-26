import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Box, Typography, CircularProgress, Button, Container } from '@mui/material';
import Navbar from '../pages/data/NavBar'
function MangaChapterViewer() {
    const [chapterData, setChapterData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const { chapterId } = router.query;

    useEffect(() => {
        if (!chapterId) return;

        const fetchChapterData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/api/FetchChapter?chapterId=${chapterId}`);
                if (response.status === 200) {
                    setChapterData(response.data.results);
                } else {
                    setError('Failed to fetch chapter data');
                }
            } catch (err) {
                console.error("Error fetching chapter data:", err);
                setError('An error occurred while fetching chapter data');
            } finally {
                setLoading(false);
            }
        };

        fetchChapterData();
    }, [chapterId]);

    if (error) return <div>Error: {error}</div>;
    if (loading) return <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh"><CircularProgress /></Box>;
    if (!chapterData) return <div>No data found</div>;

    const mangaId = chapterData.currentChapter.split('/chapter')[0];
  
    const currentChapterIndex = chapterData.chapters.indexOf(chapterData.currentChapter.split('/').pop());
    const prevChapterIndex = currentChapterIndex + 1;
    const nextChapterIndex = currentChapterIndex - 1;

    const prevChapter = prevChapterIndex < chapterData.chapters.length ? `${mangaId}/${chapterData.chapters[prevChapterIndex]}` : null;
    const nextChapter = nextChapterIndex >= 0 ? `${mangaId}/${chapterData.chapters[nextChapterIndex]}` : null;

    const navigateToChapter = (chapterPath) => {
        router.push(`/MangaChapterViewer?chapterId=${chapterPath}`);
    };

    return (
        <div style={{ backgroundColor: '#070c13' }}>
              <Navbar/>
        <Container maxWidth="lg" sx={{
            backgroundColor: '#070c13', 
            color: 'white', 
            p: '20px',
            '@media (max-width: 600px)': {
                p: 0, // Remove padding on small screens
            }
        }}>
         
            <Box textAlign="center" my={2} padding={'20px'}>
                {prevChapter && <Button variant="outlined" onClick={() => navigateToChapter(prevChapter)} sx={{ mr: '10px', float:'left', borderRadius:'20px' }}>Previous</Button>}
                {nextChapter && <Button variant="outlined" onClick={() => navigateToChapter(nextChapter)} sx={{ mr: '10px', float:'right',borderRadius:'20px' }}>Next</Button>}
            </Box>
            <Typography variant="h4" component="h1" textAlign="center" mb={8} fontWeight="bold" color="whitesmoke">
                {chapterData.title}
            </Typography>
            <div>
                {chapterData.images.map((imgSrc, index) => (
                    <img key={index} src={imgSrc} alt={`Chapter image ${index + 1}`} style={{ width: '100%', display: 'block' }} />
                ))}
            </div>
            
            <div style={{ backgroundColor: '#070c13' }}>
        <Box textAlign="center" my={2} sx={{ padding: '50px' }}>
                {prevChapter && <Button variant="outlined" onClick={() => navigateToChapter(prevChapter)} sx={{ mr: '10px', float: 'left',borderRadius:'20px' }}>Previous</Button>}
                {nextChapter && <Button variant="outlined"onClick={() => navigateToChapter(nextChapter)} sx={{ mr: '10px', float: 'right' ,borderRadius:'20px'}}>Next</Button>}
            </Box>
        </div>
        </Container>
       
        </div>
    );
}

export default MangaChapterViewer;
