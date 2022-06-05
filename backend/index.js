// including of express server to connect
const connectToMongo = require("./db");

// importing of db.js
const express = require("express");
connectToMongo();

// calling of express function and storing its module into app variable
const app = express();

// defining of port i.e 5000 on which the application being called
const port = 5000;

app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// server listening on port specified and callback function
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
