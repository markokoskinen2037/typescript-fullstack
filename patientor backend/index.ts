const PORT = 3001;

import express from 'express';
var cors = require('cors')
const app = express();

app.use(cors())
app.use(express.json());

app.get('/api/ping', (_req, res) => { 
  console.log('someone pinged here');
  res.send('pong');
});
  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});