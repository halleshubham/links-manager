// src/VideoCompressor.tsx
import React, { useState } from 'react';
import { Container, Typography, Button, Box, Input, Select, MenuItem, FormControl, InputLabel, CircularProgress, SelectChangeEvent } from '@mui/material';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import coreURL from '@ffmpeg/core?url';

const ffmpeg = createFFmpeg({ log: true, corePath: coreURL });

const VideoCompressor: React.FC = () => {
  const [compressionRatio, setCompressionRatio] = useState<number>(20);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  //const videoRef = React.useRef(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true);
      if (!ffmpeg.isLoaded()) {
        await ffmpeg.load();
      }
      ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(file));
      const outputFileName = 'output.mp4';
      const compressionFactor = compressionRatio === 20 ? 5 : 2; // Adjust the factor based on the ratio - -vf scale=1280:720 -r 24 -c:v libx265 -crf 28
      //await ffmpeg.run('-i', 'input.mp4','-vf', 'scale=480:270', '-r', '24', '-c:v', 'libx265', '-crf', '28', '-b:v', `${compressionFactor}00k`, '-b:a', '64k','-c:a', 'aac', 'output_compressed.mp4', outputFileName, '-s', 'ASSERTIONS=1'); //ffmpeg -i input.mp4 -b:v 1000k -b:a 128k output_compressed.mp4
      await ffmpeg.run('-i', 'input.mp4', '-c:v', 'libx264', '-r', '24', '-vf', 'scale=640:360', '-b:v', `${compressionFactor}00k`, '-b:a', '64k','-c:a', 'aac','-crf', '28', 'output_compressed.mp4', outputFileName, '-s', 'ASSERTIONS=1'); //ffmpeg -i input.mp4 -b:v 1000k -b:a 128k output_compressed.mp4
      const data = ffmpeg.FS('readFile', 'output_compressed.mp4');
      setCompressedFile(new File([data.buffer], 'compressed-video.mp4', { type: 'video/mp4' }));
      setLoading(false);
    }
  };

  const handleCompressionRatioChange = (event: SelectChangeEvent<number>) => {
    setCompressionRatio(Number(event.target.value));
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