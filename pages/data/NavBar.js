import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import Image from 'next/image';
import Paper from '@mui/material/Paper';
import Link from 'next/link';

import logo from '../../assets/anilogo.svg'; 



const drawerWidth = 240;
// Update navItems as per requirements
const navItems = ['Newest Releases', 'Latest Manga'];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(2),
  width: 'auto',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '12ch',
    '&:focus': {
      width: '20ch',
    },
  },
}));
function MangaZone(props) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  console.log(searchQuery)
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

const handleSearch = (e) => {
  console.log(searchQuery)
    e.preventDefault();
    router.push(`/Search?query=${searchQuery}`);
  };



  const handleLatestMangaClick = (event) => {
    const latestMangaPath = '/latestmanga';
    
        router.push({
          pathname: latestMangaPath,
          query: 
          {
            type:'all'
          }
          
        }, undefined, { shallow: false });
      };

   
        // Navigate to the Latest Manga page if on a different page
      

  

 
  const drawer = (
    <Box
      sx={{ width: drawerWidth, bgcolor: 'black' }}
      role="presentation"
      onClick={handleDrawerToggle}
      onKeyDown={handleDrawerToggle}
    >
      <Typography variant="h6" sx={{ my: 2, textAlign: 'center', color: 'white' }}>
        MangaZone
      </Typography>
      <List>
  {navItems.map((item) => (
    // Checks if the item is "Latest Manga" to add special behavior
    item === 'Latest Manga' ? (
      <ListItem disablePadding key={item}>
        <ListItemButton onClick={() => handleLatestMangaClick()}>
          <ListItemText primary={item} primaryTypographyProps={{ style: { color: 'white' } }} />
        </ListItemButton>
      </ListItem>
    ) : (
      // Original Link component for other items
      <Link key={item} href={`/${item.replace(/\s+/g, '').toLowerCase()}`} passHref>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary={item} primaryTypographyProps={{ style: { color: 'white' } }} />
          </ListItemButton>
        </ListItem>
      </Link>
    )
  ))}
</List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="relative" component="nav" sx={{ bgcolor: 'black', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Link href='/'>
          <Image
            priority
            src={logo}
            height={45}
            width={45}
            alt="Logo"
            style={{ padding: "2px" }}
          />
</Link>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, marginLeft: 0 }}
          >
            MangaZone
          </Typography>
         
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexGrow: 1 }}>
  {navItems.map((item) => (
    item === 'Latest Manga' ? (
      <Button key={item} onClick={() => handleLatestMangaClick()} sx={{ color: '#fff', mx: 2, '&:hover': { backgroundColor: alpha('#ffffff', 0.25) } }}>
        {item}
      </Button>
    ) : (
      <Link key={item} href={`/${item.replace(/\s+/g, '').toLowerCase()}`} passHref>
        <Button sx={{ color: '#fff', mx: 2, '&:hover': { backgroundColor: alpha('#ffffff', 0.25) } }}>
          {item}
        </Button>
      </Link>
    )
  ))}
</Box>

          <form onSubmit={handleSearch} style={{ marginRight: '0' }}>
          <Search style={{marginRight:'0'}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => setSearchQuery(e.target.value)}
             
            />
            
          </Search>
          </form>
        </Toolbar>
      </AppBar>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: 'black' },
        }}
      >
        {drawer}
      </Drawer>
    
    </Box>
  );
}

MangaZone.propTypes = {
  window: PropTypes.func,
};

export default MangaZone;
