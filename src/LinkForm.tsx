// src/LinkForm.tsx
import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface Link {
  id: number;
  name: string;
  url: string;
  tags?: string;
  category: string;
}

interface LinkFormProps {
  addLink: (link: Link) => void;
  updateLink: (link: Link) => void;
  editingLink: Link | null;
  setEditingLink: (link: Link | null) => void;
  currentCategory: string;
}

export const LinkForm: React.FC<LinkFormProps> = ({ addLink, updateLink, editingLink, setEditingLink, currentCategory }) => {
  const [name, setName] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [tags, setTags] = useState<string>('');

  useEffect(() => {
    if (editingLink) {
      setName(editingLink.name);
      setUrl(editingLink.url);
      setTags(editingLink.tags || '');
    } else {
      setName('');
      setUrl('');
      setTags('');
    }
  }, [editingLink]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLink: Link = {
      id: editingLink ? editingLink.id : Date.now(),
      name,
      url,
      tags,
      category: currentCategory,
    };
    if (editingLink) {
      updateLink(newLink);
    } else {
      addLink(newLink);
    }
    setEditingLink(null);
    setName('');
    setUrl('');
    setTags('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        {editingLink ? 'Update Link' : 'Add Link'}
      </Button>
    </Box>
  );
};