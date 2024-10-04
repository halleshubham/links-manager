// src/NavBar.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Multi-App Manager
        </Typography>
        <Button color="inherit" component={Link} to="/links-manager">
          Links Manager
        </Button>
        <Button color="inherit" component={Link} to="/image-compressor">
          Image Compressor
        </Button>
        <Button color="inherit" component={Link} to="/pdf-compressor">
          PDF Compressor
        </Button>
        <Button color="inherit" component={Link} to="/background-remover">
          Background Remover
        </Button>
        <Button color="inherit" onClick={handleClick}>
          File Conversions
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem component={Link} to="/csv-to-excel" onClick={handleClose}>
            CSV to Excel
          </MenuItem>
          <MenuItem component={Link} to="/excel-to-csv" onClick={handleClose}>
            Excel to CSV
          </MenuItem>
          <MenuItem component={Link} to="/csv-to-vcf" onClick={handleClose}>
            CSV to VCF
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;