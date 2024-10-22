// src/VideoCompressor.tsx
import React, { useState } from 'react';
import { Container, Typography, Button, Box, Input, Select, MenuItem, FormControl, InputLabel, CircularProgress, SelectChangeEvent } from '@mui/material';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

const ffmpeg = new FFmpeg();
const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';

const VideoCompressor: React.FC = () => {
  const [compressionRatio, setCompressionRatio] = useState<number>(20);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true);
      if (!ffmpeg.loaded) {
        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
            workerURL: await toBlobURL(`${baseURL}/ffmpeg-worker.esm.js`, 'text/javascript'),
          });
      }
      ffmpeg.writeFile('input.mp4', await fetchFile(file));
      const outputFileName = 'output.mp4';
      const compressionFactor = compressionRatio === 20 ? 5 : 2; // Adjust the factor based on the ratio
      await ffmpeg.exec(['-i', 'input.mp4', '-b:v', `${compressionFactor}M`, outputFileName]);
      const data = await ffmpeg.readFile(outputFileName);
      const compressedBlob = new Blob([data], { type: 'video/mp4' });
      const compressedFile = new File([compressedBlob], 'compressed-video.mp4', { type: 'video/mp4' });
      setCompressedFile(compressedFile);
      setLoading(false);
    }
  };

  const handleCompressionRatioChange = (event: SelectChangeEvent<number>) => {
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
      {loading && <CircularProgress sx={{ mt: 2 }} />}
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