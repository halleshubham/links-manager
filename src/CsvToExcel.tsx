// src/CsvToExcel.tsx
import React, { useState } from 'react';
import { Container, Typography, Button, Box, Input } from '@mui/material';
import * as XLSX from 'xlsx';

const CsvToExcel: React.FC = () => {
  const [excelFile, setExcelFile] = useState<Blob | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const excelFile = new Blob([excelBuffer], { type: 'application/octet-stream' });
        setExcelFile(excelFile);
      };
      reader.readAsBinaryString(file);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        CSV to Excel Converter
      </Typography>
      <Input type="file" onChange={handleFileChange} />
      {excelFile && (
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            href={URL.createObjectURL(excelFile)}
            download="converted.xlsx"
            sx={{ mt: 2 }}
          >
            Download Excel File
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default CsvToExcel;