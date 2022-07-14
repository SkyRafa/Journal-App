import mariadb from "mariadb";
import "dotenv/config";

interface db_configType {
  host: string;
  database: string;
  user: string;
  password: string;
}

export const db_config: db_configType = {
  host: process.env.SQL_HOST!,
  database: process.env.SQL_DB!,
  user: process.env.SQL_USER!,
  password: process.env.SQL_PASSWORD!,
};

export const pool = mariadb.createPool({
  ...db_config,
});
