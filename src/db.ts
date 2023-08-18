import { Client } from 'pg';

const client = new Client({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

export const connectPostgres = async () => {
  await client.connect();

  const createTableQuery = `
      CREATE TABLE IF NOT EXISTS test (
        id serial PRIMARY KEY,
        test_field varchar(255)
      );
    `;

  await client.query(createTableQuery);

  const insertRowQuery = `    
        INSERT INTO test (test_field)
        VALUES ('Hello World ${Math.random()}');
    `;

  await client.query(insertRowQuery);

  console.log('Connected to Postgres');
};

export const db = client;
