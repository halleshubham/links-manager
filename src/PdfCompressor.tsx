// src/PdfCompressor.tsx
import React, { useState } from 'react';
import { Container, Typography, Button, Box, Input } from '@mui/material';
import { PDFDocument } from 'pdf-lib';

const PdfCompressor: React.FC = () => {
  const [compressedFile, setCompressedFile] = useState<File | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const pdfDoc = await PDFDocument.load(await file.arrayBuffer());
        const compressedPdfBytes = await pdfDoc.save({ useObjectStreams: false });
        const compressedFile = new File([compressedPdfBytes], 'compressed.pdf', { type: 'application/pdf' });
        setCompressedFile(compressedFile);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        PDF Compressor
      </Typography>
      <Input type="file" onChange={handleFileChange} />
      {compressedFile && (
        <Box mt={2}>
          <Typography variant="body1">Compressed PDF:</Typography>
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