import path from "path";

module.exports = {
  client: "sqlite3",
  connection: {
    filename: path.resolve(__dirname, "src", "data", "data.sqlite"),
  },
  migrations: {
    directory: path.resolve(__dirname, "src", "data", "migrations"),
  },
  useNullAsDefault: true,
};
