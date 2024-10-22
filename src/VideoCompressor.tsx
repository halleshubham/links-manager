// src/VideoCompressor.tsx
import React, { useState } from 'react';
import { Container, Typography, Button, Box, Input, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const VideoCompressor: React.FC = () => {
  const [compressionRatio, setCompressionRatio] = useState<number>(20);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Implement video compression logic here
      // For now, we'll just set the file as compressedFile
      setCompressedFile(file);
    }
  };

  const handleCompressionRatioChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCompressionRatio(event.target.value as number);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Video Compressor
      </Typography>
      <Typography variant="body1" gutterBottom>
        Compress your videos easily with our Video Compressor. Choose a compression ratio and upload your video file.
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
          <Button
            variant="contained"
            color="primary"
            href={URL.createObjectURL(compressedFile)}
            download="compressed-video.mp4"
            sx={{ mt: 2 }}
          >
            Download Compressed Video
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default VideoCompressor;