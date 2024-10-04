// src/BackgroundRemover.tsx
import React, { useState } from 'react';
import { Container, Typography, Button, Box, Input } from '@mui/material';
import { removeBackground } from '@imgly/background-removal';

const BackgroundRemover: React.FC = () => {
  const [processedFile, setProcessedFile] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Image = e.target?.result as string;
        try {
          const result = await removeBackground(base64Image);
          setProcessedFile(result);
        } catch (error) {
          console.error(error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Background Remover
      </Typography>
      <Input type="file" onChange={handleFileChange} />
      {processedFile && (
        <Box mt={2}>
          <Typography variant="body1">Processed Image:</Typography>
          <img src={processedFile} alt="Processed" style={{ maxWidth: '100%' }} />
          <Button
            variant="contained"
            color="primary"
            href={processedFile}
            download="processed.png"
            sx={{ mt: 2 }}
          >
            Download Processed Image
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default BackgroundRemover;