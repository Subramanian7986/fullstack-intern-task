require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/templates', require('./routes/templates'));
app.use('/api/favorites', require('./routes/favorites'));

const PORT = process.env.PORT || 5000;

db.migrate.latest().then(() => db.seed.run()).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
