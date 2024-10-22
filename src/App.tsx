import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, CssBaseline, Grid } from '@mui/material';
import NavBar from './NavBar';
import Home from './Home';
import LinksManager from './LinksManager';
import ImageCompressor from './ImageCompressor';
import PdfCompressor from './PdfCompressor';
import BackgroundRemover from './BackgroundRemover';
import CsvToExcel from './CsvToExcel';
import ExcelToCsv from './ExcelToCsv';
import CsvToVcf from './CsvToVcf';
import TasksManager from './TasksManager';
import ExcelToVcf from './ExcelToVcf';
import VideoCompressor from './VideoCompressor'; // Import the new component

const App: React.FC = () => {
  return (
    <Router>
      <CssBaseline />
      <NavBar />
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/links-manager" element={<LinksManager />} />
              <Route path="/image-compressor" element={<ImageCompressor />} />
              <Route path="/pdf-compressor" element={<PdfCompressor />} />
              <Route path="/background-remover" element={<BackgroundRemover />} />
              <Route path="/csv-to-excel" element={<CsvToExcel />} />
              <Route path="/excel-to-csv" element={<ExcelToCsv />} />
              <Route path="/csv-to-vcf" element={<CsvToVcf />} />
              <Route path="/excel-to-vcf" element={<ExcelToVcf />} />
              <Route path="/tasks-manager" element={<TasksManager />} />
              <Route path="/video-compressor" element={<VideoCompressor />} /> {/* Add the new route */}
            </Routes>
          </Grid>
        </Grid>
      </Container>
    </Router>
  );
};

export default App;