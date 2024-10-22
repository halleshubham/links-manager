// src/PdfCompressor.tsx
import React, { useState } from 'react';
import { Container, Typography, Button, Box, Input, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { PDFDocument } from 'pdf-lib';

const PdfCompressor: React.FC = () => {
  const [compressionRatio, setCompressionRatio] = useState<number | undefined | "">(20);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const pdfDoc = await PDFDocument.load(await file.arrayBuffer());
        const compressedPdfBytes = await pdfDoc.save({ useObjectStreams: compressionRatio === 20 });
        const compressedFile = new File([compressedPdfBytes], 'compressed.pdf', { type: 'application/pdf' });
        setCompressedFile(compressedFile);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCompressionRatioChange = (event: SelectChangeEvent<number>) => {
    setCompressionRatio(event.target.value as number);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        PDF Compressor
      </Typography>
      <Typography variant="body1" gutterBottom>
        Compress your PDF files easily with our PDF Compressor. Choose a compression ratio and upload your PDF file.
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
            download="compressed.pdf"
            sx={{ mt: 2 }}
          >
            Download Compressed PDF
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default PdfCompressor;