const app = require('./app');

const ip = process.env.IP || '0.0.0.0';
const port = process.env.PORT || 5050;
app.listen(port, ip, () => {
  console.log(`Listening: http://localhost:${port}`);
});