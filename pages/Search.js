import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {CircularProgress} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { useRouter } from 'next/router'; 
import Navbar from '../pages/data/NavBar';



const MangaSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const { query: queryParam } = router.query;
    
    useEffect(() => {
        if (queryParam && !query) {
            setQuery(queryParam);
            setCurrentPage(1);
            handleSearch(queryParam, 1);
        }
    }, [queryParam]);

    const handleSearch = async (searchQuery, pageNumber) => {
        try {
            const response = await axios.get(`/api/Search?query=${searchQuery}&page=${pageNumber}`);
            setResults(response.data.results);
            setTotalPages(parseInt(response.data.pages.totalPage) || 1);
        } catch (error) {
            console.error("Error fetching data: ", error);
            setResults([]);
            setTotalPages(1);
        }
        finally {
            setIsLoading(false);
          }
    };

    const handleClick = (chapterId) => {
        router.push(`/Chapter?chapterId=${chapterId}`);
    };

    if (isLoading) {
        return (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <CircularProgress />
          </Box>
        );
      }




    return (
            
            <div style={{backgroundColor:'#070c13'}}> 
                <Navbar/>
                <Container style={{ padding: '20px' }}>
                    <Box my={4} display="flex" justifyContent="center">
                        <Grid container alignItems="center" justifyContent="center">
                            <Grid item xs={12} sm={8} md={6}>
                                <form onSubmit={(e) => { e.preventDefault(); setCurrentPage(1); handleSearch(query, 1); }}>
                                <TextField
    fullWidth
    label="Search manga..."
    variant="filled"
    color="secondary"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    InputLabelProps={{
        style: { color: '#fff' }, // Changes the label text color to white for better visibility
    }}
    sx={{
        '& .MuiFilledInput-input': {
            color: 'white', // Text color within the input for contrast on dark background
        },
        '& .MuiFilledInput-underline:after': {
            borderBottomColor: 'white', // Underline color after input is clicked
        },
        '& .MuiFilledInput-underline:before': {
            borderBottomColor: 'rgba(255, 255, 255, 0.7)', // Default underline color
        },
        backgroundColor: 'rgba(255, 255, 255, 0.15)', // Semi-transparent white background for contrast on dark
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.25)', // Darken on hover for a subtle interactive effect
        },
        borderRadius: '4px', // Rounded corners. Adjust the value to increase or decrease the curvature
        '& .MuiFilledInput-root': {
            borderTopLeftRadius: '4px', // Top Left Corner
            borderTopRightRadius: '4px', // Top Right Corner
            borderBottomLeftRadius: '4px', // Bottom Left Corner
            borderBottomRightRadius: '4px', // Bottom Right Corner
            overflow: 'hidden', // Ensure the background color fills the rounded corners
        },
    }}
/>


                                </form>
                            </Grid>
                        </Grid>
                    </Box>

                    <Grid container spacing={3}>
                    {results.map((manga, index) => (
                 <Grid key={index} item xs={12} sm={6} md={4} lg={3} className="hover:scale-105 transition-transform duration-200">
                 <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#070c13' }}>
                        <CardMedia
                            component="img"
                            image={manga.img}
                            alt={manga.title}
                            className="w-full"
                            style={{ height: '250px', objectFit: 'cover' }}
                        />
                        <CardContent>
                            <Box >
                            <Typography
  gutterBottom
  variant="h5"
                      component="div"
                      className="font-bold text-xl mb-2 cursor-pointer" color="white" // Adding cursor-pointer for visual feedback
  onClick={() => handleClick(manga.id)} // Attaching the onClick event
>
  {manga.title}
</Typography>
<Typography variant="body2" color="grey" flexGrow={1} mr={1} noWrap>
Updated: {manga.update}
<br></br>
Views: {manga.view}
</Typography>

                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>

                    {currentPage > 0 && (
                        <Box my={4} display="flex" justifyContent="center">
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={(e, page) => { setCurrentPage(page); handleSearch(query, page); }}
                            variant="outlined"
                            color="secondary"
                            sx={{
                                '& .MuiButtonBase-root': { color: 'white' }, // Changing button text color to white
                                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, // Changing outline to white
                            }}
                        />
                    </Box>
                    )}
                </Container>
            </div>
    );
};

export default MangaSearch;
