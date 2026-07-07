import passport from "passport";
import "../strategies/googleStrategy.js";
import "../strategies/githubStrategy.js";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;