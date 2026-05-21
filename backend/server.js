const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

app.get('/users', async (req, res) => {
  try {
    console.log("==== /users API called ====");

    const query = 'SELECT * FROM users';

    console.log("Executing query:", query);

    const [rows] = await db.query(query);

    console.log("Query successful");
    console.log("Rows returned:", rows);

    res.json(rows);

  } catch (err) {
    console.error("==== USERS API ERROR ====");
    console.error(err);

    res.status(500).json({
      error: err.message
    });
  }
});

app.post('/users', (req, res) => {
  const { name } = req.body;

  db.query(
    'INSERT INTO users (name) VALUES (?)',
    [name],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({ message: 'User added successfully' });
    }
  );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
