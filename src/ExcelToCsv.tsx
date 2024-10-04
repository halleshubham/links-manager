// src/ExcelToCsv.tsx
import React, { useState } from 'react';
import { Container, Typography, Button, Box, Input } from '@mui/material';
import * as XLSX from 'xlsx';

const ExcelToCsv: React.FC = () => {
  const [csvFile, setCsvFile] = useState<Blob | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const csvBuffer = XLSX.write(workbook, { bookType: 'csv', type: 'array' });
        const csvFile = new Blob([csvBuffer], { type: 'text/csv' });
        setCsvFile(csvFile);
      };
      reader.readAsBinaryString(file);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Excel to CSV Converter
      </Typography>
      <Input type="file" onChange={handleFileChange} />
      {csvFile && (
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            href={URL.createObjectURL(csvFile)}
            download="converted.csv"
            sx={{ mt: 2 }}
          >
            Download CSV File
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default ExcelToCsv;