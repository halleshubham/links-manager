// src/Home.tsx
import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, CardActionArea, Menu, MenuItem, IconButton, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import LinkIcon from '@mui/icons-material/Link';
import TaskIcon from '@mui/icons-material/Task';
import ImageIcon from '@mui/icons-material/Image';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import BackgroundIcon from '@mui/icons-material/Wallpaper';
import CsvIcon from '@mui/icons-material/InsertDriveFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Home: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuId, setMenuId] = useState<string | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setMenuId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuId(null);
  };

  const renderMenu = (id: string, options: { label: string, path: string }[]) => (
    <Menu
      anchorEl={anchorEl}
      open={menuId === id}
      onClose={handleClose}
    >
      {options.map(option => (
        <MenuItem key={option.path} component={Link} to={option.path} onClick={handleClose}>
          {option.label}
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Utilify Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardActionArea component={Link} to="/links-manager">
              <CardContent>
                <LinkIcon fontSize="large" />
                <Typography variant="h6">Links Manager</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardActionArea component={Link} to="/tasks-manager">
              <CardContent>
                <TaskIcon fontSize="large" />
                <Typography variant="h6">Tasks Manager</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardActionArea component={Link} to="/image-compressor">
              <CardContent>
                <ImageIcon fontSize="large" />
                <Typography variant="h6">Image Compressor</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardActionArea component={Link} to="/pdf-compressor">
              <CardContent>
                <PictureAsPdfIcon fontSize="large" />
                <Typography variant="h6">PDF Compressor</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardActionArea component={Link} to="/background-remover">
              <CardContent>
                <BackgroundIcon fontSize="large" />
                <Typography variant="h6">Background Remover</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardActionArea onClick={(e) => handleClick(e, 'file-conversions')}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <CsvIcon fontSize="large" />
                    <Typography variant="h6">File Conversions</Typography>
                  </Box>
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
          {renderMenu('file-conversions', [
            { label: 'CSV to Excel', path: '/csv-to-excel' },
            { label: 'Excel to CSV', path: '/excel-to-csv' },
            { label: 'CSV to VCF', path: '/csv-to-vcf' },
            { label: 'Excel to VCF', path: '/excel-to-vcf' },
          ])}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardActionArea component={Link} to="/video-compressor">
              <CardContent>
                <VideoLibraryIcon fontSize="large" />
                <Typography variant="h6">Video Compressor</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;