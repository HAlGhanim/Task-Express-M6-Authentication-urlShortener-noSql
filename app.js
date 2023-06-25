const connectDb = require("./database");
const express = require("express");
const app = express();
const urlRoutes = require("./api/urls/urls.routes");
const userRoutes = require("./api/users/users.routes");
const notFound = require("./middlewares/notFoundHandler");
const errorHandler = require("./middlewares/errorHandler");
const passport = require("passport");
const config = require("./config/keys");
const {
  localUserStrategy,
  localEmailStrategy,
  jwtStrategy,
} = require("./middlewares/passport");

connectDb();
app.use(express.json());
app.use(passport.initialize());
passport.use("local-username", localUserStrategy);
passport.use("local-email", localEmailStrategy);
passport.use(jwtStrategy);

app.use("/urls", urlRoutes);
app.use(userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`The application is running on ${config.PORT}`);
});
