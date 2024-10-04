// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, TextField, Button, Accordion, AccordionSummary, AccordionDetails, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { LinkForm } from './LinkForm';
import { LinkList } from './LinkList';
import { CategoryManager } from './CategoryManager';

interface Link {
  id: number;
  name: string;
  url: string;
  tags?: string;
  category: string;
}

const LinksManager: React.FC = () => {
  const [links, setLinks] = useState<Link[]>(JSON.parse(localStorage.getItem('links') || '[]') as Link[]);
  const [categories, setCategories] = useState<string[]>(JSON.parse(localStorage.getItem('categories') || '["Work", "Personal", "Others"]') as string[]);
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expanded, setExpanded] = useState<string[]>([]);
  const [showAddLinkForm, setShowAddLinkForm] = useState<{ [key: string]: boolean }>({});
  const [openCategoryManager, setOpenCategoryManager] = useState<boolean>(false);

  useEffect(() => {
    const storedLinks = JSON.parse(localStorage.getItem('links') || '[]') as Link[];
    const storedCategories = JSON.parse(localStorage.getItem('categories') || '["Work", "Personal", "Others"]') as string[];
    setLinks(storedLinks);
    setCategories(storedCategories);
  }, []);

  useEffect(() => {
    localStorage.setItem('links', JSON.stringify(links));
  }, [links]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const addLink = (link: Link) => {
    setLinks([...links, link]);
  };

  const updateLink = (updatedLink: Link) => {
    setLinks(links.map(link => link.id === updatedLink.id ? updatedLink : link));
  };

  const deleteLink = (id: number) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const addCategory = (category: string) => {
    setCategories([...categories, category]);
  };

  const removeCategory = (category: string) => {
    setCategories(categories.filter(cat => cat !== category));
    setLinks(links.filter(link => link.category !== category));
  };

  const handleAccordionChange = (category: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    console.log('event', event);
    setExpanded(isExpanded ? [...expanded, category] : expanded.filter(cat => cat !== category));
    setShowAddLinkForm({ ...showAddLinkForm, [category]: false });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const categoriesToExpand = categories.filter(category =>
      links.some(link =>
        link.category === category &&
        (link.name.toLowerCase().includes(query) ||
          link.url.toLowerCase().includes(query) ||
          (link.tags && link.tags.toLowerCase().includes(query)) ||
          link.category.toLowerCase().includes(query))
    ));
    setExpanded(categoriesToExpand);
  };

  const filteredLinks = links.filter(link =>
    link.name.toLowerCase().includes(searchQuery) ||
    link.url.toLowerCase().includes(searchQuery) ||
    (link.tags && link.tags.toLowerCase().includes(searchQuery)) ||
    link.category.toLowerCase().includes(searchQuery)
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Link Manager</Typography>
      <TextField
        label="Search"
        value={searchQuery}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
      />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenCategoryManager(true)}
            fullWidth
          >
            Manage Categories
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {categories.map(category => (
              <Grid item xs={12} md={4} key={category}>
                <Accordion expanded={expanded.includes(category)} onChange={handleAccordionChange(category)}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">{category}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <LinkList 
                      links={filteredLinks.filter(link => link.category === category)} 
                      setEditingLink={setEditingLink} 
                      deleteLink={deleteLink} 
                      searchQuery={searchQuery}
                    />
                    <Button onClick={() => setShowAddLinkForm({ ...showAddLinkForm, [category]: !showAddLinkForm[category] })} variant="contained" color="primary">
                      {showAddLinkForm[category] ? 'Cancel' : 'Add new link'}
                    </Button>
                    <Box sx={{ mt: 2, display: showAddLinkForm[category] ? 'block' : 'none' }}>
                      {showAddLinkForm[category] && (
                        <LinkForm 
                          addLink={addLink} 
                          updateLink={updateLink} 
                          editingLink={editingLink} 
                          setEditingLink={setEditingLink} 
                          currentCategory={category}
                        />
                      )}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Dialog open={openCategoryManager} onClose={() => setOpenCategoryManager(false)} fullWidth maxWidth="sm">
        <DialogTitle>Manage Categories</DialogTitle>
        <DialogContent>
          <CategoryManager 
            categories={categories} 
            addCategory={addCategory} 
            removeCategory={removeCategory} 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCategoryManager(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default LinksManager;