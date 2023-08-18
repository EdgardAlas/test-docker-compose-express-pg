import { config } from 'dotenv';
import express from 'express';
import { connectPostgres, db } from './db';

config();

const app = express();

app.get('/', async (req, res) => {
  const rows = await db.query('SELECT * FROM test');

  res.json(rows.rows);
});

app.get('/insert', (req, res) => {
  const { count = 10 } = req.query;

  const insertRowQuery = `
        INSERT INTO test (test_field)
        VALUES ('Hello World ${Math.random()}');
    `;
  const promises = [];

  for (let i = 0; i < Number(count); i++) {
    promises.push(db.query(insertRowQuery));
  }

  Promise.all(promises).then(() => {
    res.json({ message: 'Inserted' });
  });
});

app.listen(3000, () => {
  connectPostgres();
  console.log('Server is running');
});
