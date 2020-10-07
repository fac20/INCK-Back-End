/* Import and start server */
const server = require('./server');
const PORT = process.env.PORT || 3000;

server.listen(PORT, () =>
  console.log(`Listening on port http://localhost:${PORT}`)
);
