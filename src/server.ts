import { createServer } from 'http';
import { config } from 'dotenv';
import { handleServerResponse } from './routes/routes.js';

config();

const server = createServer(handleServerResponse);

const PORT = process.env['PORT'] || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
