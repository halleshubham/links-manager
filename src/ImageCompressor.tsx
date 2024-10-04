// src/ImageCompressor.tsx
import React, { useState } from 'react';
import { Container, Typography, Button, Box, Input } from '@mui/material';
import imageCompression from 'browser-image-compression';

const ImageCompressor: React.FC = () => {
  const [compressedFile, setCompressedFile] = useState<File | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(file, options);
        setCompressedFile(compressedFile);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Image Compressor
      </Typography>
      <Input type="file" onChange={handleFileChange} />
      {compressedFile && (
        <Box mt={2}>
          <Typography variant="body1">Compressed Image:</Typography>
          <img src={URL.createObjectURL(compressedFile)} alt="Compressed" style={{ maxWidth: '100%' }} />
          <Button
            variant="contained"
            color="primary"
            href={URL.createObjectURL(compressedFile)}
            download="compressed-image.jpg"
            sx={{ mt: 2 }}
          >
            Download Compressed Image
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default ImageCompressor;