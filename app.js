const express = require("express");
const router = require("./routers");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server Music Label running on port ${port}`);
});
