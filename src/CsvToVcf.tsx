// src/CsvToVcf.tsx
import React, { useState } from 'react';
import { Container, Typography, Button, Box, Input } from '@mui/material';
import { parse } from 'papaparse';

const CsvToVcf: React.FC = () => {
  const [vcfFile, setVcfFile] = useState<Blob | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        const parsedData = parse(data as string, { header: true }).data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const vcfData = parsedData.map((contact: any) => {
          return `BEGIN:VCARD
            VERSION:3.0
            FN:${contact.Name}
            TEL:${contact.Phone}
            EMAIL:${contact.Email}
            END:VCARD`;
        }).join('\n');
        const vcfFile = new Blob([vcfData], { type: 'text/vcard' });
        setVcfFile(vcfFile);
      };
      reader.readAsText(file);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        CSV to VCF Converter
      </Typography>
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

export default CsvToVcf;