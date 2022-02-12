const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = express.Router();
const routes = require('./routes');
const { environment } = require('./config');
const path = require("path");
const app = express();
if (process.env.NODE_ENV === "production") {

  app.use(express.static("client/build"));

  app.get("*", (req, res) => {

    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));

  });

}
// if (process.env.NODE_ENV === 'production') {
//   const path = require('path');
//   router.get('/', (req, res) => {
//     res.sendFile(
//       path.resolve(__dirname, '../frontend', 'build', 'index.html')
//     );
//   });
//   router.use(express.static(path.resolve("../frontend/build")));
//   router.get(/^(?!\/?api).*/, (req, res) => {
//     res.sendFile(
//       path.resolve(__dirname, '../frontend', 'build', 'index.html')
//     );
//   });
// }
const isProduction = environment === 'production';



app.use(morgan('dev'));

app.use(express.json());


if (!isProduction) {
  app.use(cors());
};




app.use(routes);

module.exports = app;