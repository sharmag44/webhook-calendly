/** Start server for elevate. */

const app = require("./app");
const PORT = 8000


app.listen(PORT, function () {
  console.log(`Server starting on port ${PORT}!`);
});
