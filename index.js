const express = require("express");

const app = express();
const PORT = 5000;
const connectDB = require('./db');

app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/admin',require('./routes/product'))







connectDB();
app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
