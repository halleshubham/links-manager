// src/ExcelToVcf.tsx
import React, { useState } from 'react';
import { Container, Typography, Button, Box, Input, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import * as XLSX from 'xlsx';

const ExcelToVcf: React.FC = () => {
  const [vcfFile, setVcfFile] = useState<Blob | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const vcfData = jsonData.map((contact: any) => {
          return `BEGIN:VCARD
VERSION:3.0
FN:${contact.Name}
TEL:${contact['Phone Number']}
EMAIL:${contact['Email ID']}
END:VCARD`;
        }).join('\n');
        const vcfFile = new Blob([vcfData], { type: 'text/vcard' });
        setVcfFile(vcfFile);
      };
      reader.readAsBinaryString(file);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Excel to VCF Converter
      </Typography>
      <Typography variant="body1" gutterBottom>
        Please ensure your Excel file follows the structure below:
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Phone Number</strong></TableCell>
              <TableCell><strong>Email ID</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell>+1234567890</TableCell>
              <TableCell>john.doe@example.com</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Jane Smith</TableCell>
              <TableCell>+0987654321</TableCell>
              <TableCell>jane.smith@example.com</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Input type="file" onChange={handleFileChange} />
      {vcfFile && (
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            href={URL.createObjectURL(vcfFile)}
            download="contacts.vcf"
            sx={{ mt: 2 }}
          >
            Download VCF File
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default ExcelToVcf;