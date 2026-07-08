import User from "../models/User.js";


//Google login
export const findOrCreateGoogleUser = async (profile) => {
  const googleId = profile.id;
  const email = profile.emails?.[0]?.value.toLowerCase();
  const name = profile.displayName;

  let user = await User.findOne({ googleId });
  if (user) {
    return user;
  }

  user = await User.findOne({ email });
  if (user) {
    user.googleId = googleId;
    user.provider = "google";
    await user.save();
    return user;
  }

  user = await User.create({
    name,
    email,
    password: "",
    googleId,
    provider: "google",
    isVerified: true,
  });

  return user;
};

//Github login
export const findOrCreateGithubUser = async (profile) => {
  const githubId = profile.id;
  const email = profile.emails?.[0]?.value?.toLowerCase();
  const name = profile.displayName || profile.username;

  // Existing GitHub account
  let user = await User.findOne({ githubId });
  if (user) {
    return user;
  }

  // Existing local/Google account
  if (email) {
    user = await User.findOne({ email });
    if (user) {
      user.githubId = githubId;
      user.provider = "github";

      await user.save();

      return user;
    }
  }

  // Create new user
  user = await User.create({
    name,
    email,
    password: "",
    githubId,
    provider: "github",
    isVerified: true,
  });

  return user;
};