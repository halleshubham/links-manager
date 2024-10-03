// src/LinkList.tsx
import React from 'react';
import { List, ListItem, ListItemText, IconButton, Box, Typography, Divider } from '@mui/material';
import { Edit, Delete} from '@mui/icons-material';

interface Link {
  id: number;
  name: string;
  url: string;
  tags?: string;
  category: string;
}

interface LinkListProps {
  links: Link[];
  setEditingLink: (link: Link) => void;
  deleteLink: (id: number) => void;
  searchQuery: string;
}

const highlightText = (text: string, query: string) => {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span>
    ) : (
      part
    )
  );
};

export const LinkList: React.FC<LinkListProps> = ({ links, setEditingLink, deleteLink, searchQuery }) => {
  return (
    <List>
      {links.map(link => (
        <React.Fragment key={link.id}>
          <ListItem onClick={() => window.open(link.url, '_blank')}>
            <ListItemText
              primary={<Typography>{highlightText(link.name, searchQuery)}</Typography>}
              secondary={<Typography component="span">{highlightText(link.url, searchQuery)}</Typography>}
            />
            <Box onClick={(e) => e.stopPropagation()}>
              <IconButton edge="end" onClick={() => setEditingLink(link)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" onClick={() => deleteLink(link.id)}>
                <Delete />
              </IconButton>
            </Box>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};