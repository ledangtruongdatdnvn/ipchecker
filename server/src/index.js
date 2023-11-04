import app from "./app.js";
import constants from "./constants/index.js";

app.listen(constants.PORT, () => {
  console.log(`Running Server at "${constants.APP_URL}:${constants.PORT}/`);
});
