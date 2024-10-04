// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import LinksManager from './LinksManager';
import ImageCompressor from './ImageCompressor';
import PdfCompressor from './PdfCompressor';
import BackgroundRemover from './BackgroundRemover';
import CsvToExcel from './CsvToExcel';
import ExcelToCsv from './ExcelToCsv';
import CsvToVcf from './CsvToVcf';
import TasksManager from './TasksManager';

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/links-manager" element={<LinksManager />} />
        <Route path="/image-compressor" element={<ImageCompressor />} />
        <Route path="/pdf-compressor" element={<PdfCompressor />} />
        <Route path="/background-remover" element={<BackgroundRemover />} />
        <Route path="/csv-to-excel" element={<CsvToExcel />} />
        <Route path="/excel-to-csv" element={<ExcelToCsv />} />
        <Route path="/csv-to-vcf" element={<CsvToVcf />} />
        <Route path="/tasks-manager" element={<TasksManager />} />
      </Routes>
    </Router>
  );
};

export default App;