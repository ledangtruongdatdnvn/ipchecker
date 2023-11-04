import passport from "passport";
import * as passportJwt from "passport-jwt";
const { ExtractJwt, Strategy: StrategyJwt } = passportJwt;
import db from "../models/index.js";
import constants from "../constants/index.js";

passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: constants.JWT_SECRET,
    },
    (jwtPayload, done) => {
      return db.User.findOne({ where: { id: jwtPayload.id } })
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);
