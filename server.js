const app = require("./app/app");
const { PORT } = require("./config/app.config");

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
