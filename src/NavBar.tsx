import React from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  const [anchorElManagers, setAnchorElManagers] = React.useState<null | HTMLElement>(null);
  const [anchorElConversions, setAnchorElConversions] = React.useState<null | HTMLElement>(null);

  const handleManagersClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElManagers(event.currentTarget);
  };

  const handleManagersClose = () => {
    setAnchorElManagers(null);
  };

  const handleConversionsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElConversions(event.currentTarget);
  };

  const handleConversionsClose = () => {
    setAnchorElConversions(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <img src="./utilify.png" alt="logo" style={{ width: 30, height: 30, marginRight: 10 }} />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Utilify
        </Typography>
        <Button color="inherit" onClick={handleManagersClick}>
          Your Managers
        </Button>
        <Menu
          anchorEl={anchorElManagers}
          open={Boolean(anchorElManagers)}
          onClose={handleManagersClose}
        >
          <MenuItem component={Link} to="/links-manager" onClick={handleManagersClose}>
            Links Manager
          </MenuItem>
          <MenuItem component={Link} to="/tasks-manager" onClick={handleManagersClose}>
            Tasks Manager
          </MenuItem>
        </Menu>
        <Button color="inherit" component={Link} to="/image-compressor">
          Image Compressor
        </Button>
        <Button color="inherit" component={Link} to="/pdf-compressor">
          PDF Compressor
        </Button>
        <Button color="inherit" component={Link} to="/background-remover">
          Background Remover
        </Button>
        <Button color="inherit" onClick={handleConversionsClick}>
          File Conversions
        </Button>
        <Menu
          anchorEl={anchorElConversions}
          open={Boolean(anchorElConversions)}
          onClose={handleConversionsClose}
        >
          <MenuItem component={Link} to="/csv-to-excel" onClick={handleConversionsClose}>
            CSV to Excel
          </MenuItem>
          <MenuItem component={Link} to="/excel-to-csv" onClick={handleConversionsClose}>
            Excel to CSV
          </MenuItem>
          <MenuItem component={Link} to="/csv-to-vcf" onClick={handleConversionsClose}>
            CSV to VCF
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;