// src/CategoryManager.tsx
import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import { Delete } from '@mui/icons-material';

interface CategoryManagerProps {
  categories: string[];
  addCategory: (category: string) => void;
  removeCategory: (category: string) => void;
}

export const CategoryManager: React.FC<CategoryManagerProps> = ({ categories, addCategory, removeCategory }) => {
  const [category, setCategory] = useState<string>('');

  const handleAddCategory = () => {
    if (category && !categories.includes(category)) {
      addCategory(category);
      setCategory('');
    }
  };

  return (
    <div>
      <TextField
        label="New Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button onClick={handleAddCategory} variant="contained" color="primary">
        Add Category
      </Button>
      <List>
        {categories.map(cat => (
          <ListItem key={cat}>
            <ListItemText primary={cat} />
            <Box>
              <IconButton edge="end" onClick={() => removeCategory(cat)}>
                <Delete />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
    </div>
  );
};