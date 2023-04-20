require("dotenv").config({ path: "./config.env" });

const app = require("./app");

const mongoose = require("mongoose");

// Connect to database

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }).then(() => {
  // eslint-disable-next-line no-console
  console.log("DB connection successful!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
