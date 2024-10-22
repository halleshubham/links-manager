// src/ImageCompressor.tsx
import React, { useState } from 'react';
import { Container, Typography, Button, Box, Input, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import imageCompression from 'browser-image-compression';

const ImageCompressor: React.FC = () => {
  const [compressionRatio, setCompressionRatio] = useState<number>(20);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const options = {
        maxSizeMB: compressionRatio === 20 ? 1 : 0.5,
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

  const handleCompressionRatioChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCompressionRatio(event.target.value as number);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Image Compressor
      </Typography>
      <Typography variant="body1" gutterBottom>
        Compress your images easily with our Image Compressor. Choose a compression ratio and upload your image file.
      </Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Compression Ratio</InputLabel>
        <Select value={compressionRatio} onChange={handleCompressionRatioChange}>
          <MenuItem value={20}>20%</MenuItem>
          <MenuItem value={50}>50%</MenuItem>
        </Select>
      </FormControl>
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