import { pool } from "../data/db.config";

export const runQuery = async (query: string) => {
  let connection;
  let response;
  try {
    connection = await pool.getConnection();
    response = await connection.query(query);
    return { error: false, response, status: 200 };
  } catch (err) {
    throw err;
  } finally {
    if (connection) {
      connection.end();
    }
  }
};
