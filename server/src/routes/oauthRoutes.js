import express from "express";
import passport from "passport";
import { googleLogin, githubLogin } from "../controllers/oauthController.js";

const router = express.Router();

//google login route
router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.get("/google/callback", passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  }),
  googleLogin
);

//github login route
router.get("/github", passport.authenticate("github", {
    scope: ["user:email"],
  })
);
router.get("/github/callback", passport.authenticate("github", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  }),
  githubLogin
);

export default router;