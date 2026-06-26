import express from 'express';
import cors from 'cors';
import handler from './api/analyze.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

app.post('/api/analyze', (req, res) => handler(req, res));

app.listen(PORT, () => {
  console.log(`RigForge server running on port ${PORT}`);
});

