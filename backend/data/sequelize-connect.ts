import { Sequelize, DataTypes } from "sequelize";
import { db_config } from "./db.config";

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(db_config.database, db_config.user, db_config.password, {
  host: db_config.host,
  dialect: "mariadb",
});

export const JournalEntry = sequelize.define("JournalEntry", {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  entry: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  feelingState: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  emailHashed: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
{
  JournalEntry.sync({ alter: true });
}
