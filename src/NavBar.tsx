// src/NavBar.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, IconButton, Drawer, List, ListItem, ListItemText, Divider, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const NavBar: React.FC = () => {
  const [anchorElConversions, setAnchorElConversions] = React.useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleConversionsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElConversions(event.currentTarget);
  };

  const handleConversionsClose = () => {
    setAnchorElConversions(null);
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerList = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component={Link} to="/links-manager">
          <ListItemText primary="Links Manager" />
        </ListItem>
        <ListItem button component={Link} to="/tasks-manager">
          <ListItemText primary="Tasks Manager" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button component={Link} to="/image-compressor">
          <ListItemText primary="Image Compressor" />
        </ListItem>
        <ListItem button component={Link} to="/pdf-compressor">
          <ListItemText primary="PDF Compressor" />
        </ListItem>
        <ListItem button component={Link} to="/background-remover">
          <ListItemText primary="Background Remover" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button component={Link} to="/csv-to-excel">
          <ListItemText primary="CSV to Excel" />
        </ListItem>
        <ListItem button component={Link} to="/excel-to-csv">
          <ListItemText primary="Excel to CSV" />
        </ListItem>
        <ListItem button component={Link} to="/csv-to-vcf">
          <ListItemText primary="CSV to VCF" />
        </ListItem>
        <ListItem button component={Link} to="/excel-to-vcf">
          <ListItemText primary="Excel to VCF" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {isMobile && (
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ flexGrow: 1 }} component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Utilify
          </Typography>
          {!isMobile && (
            <>
              <Button color="inherit" component={Link} to="/links-manager">
                Links Manager
              </Button>
              <Button color="inherit" component={Link} to="/tasks-manager">
                Tasks Manager
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
                <MenuItem component={Link} to="/excel-to-vcf" onClick={handleConversionsClose}>
                  Excel to VCF
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList()}
      </Drawer>
    </>
  );
};

export default NavBar;