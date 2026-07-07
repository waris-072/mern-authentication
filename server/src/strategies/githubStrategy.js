import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { findOrCreateGithubUser } from "../services/oauthService.js";

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/github/callback",
      scope: ["user:email"],
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await findOrCreateGithubUser(profile);

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);