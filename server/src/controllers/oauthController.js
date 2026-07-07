import { oauthLogin } from "../services/authService.js";

export const googleLogin = async (req, res) => {
  try {
    const { accessToken, refreshToken } =
      await oauthLogin(req.user);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.redirect(`${process.env.CLIENT_URL}/profile`);
  } catch (err) {
    res.redirect(`${process.env.CLIENT_URL}/login`);
  }
};

export const githubLogin = async (req, res) => {
  try {
    const { accessToken, refreshToken } =
      await oauthLogin(req.user);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.redirect(`${process.env.CLIENT_URL}/profile`);
  } catch (err) {
    res.redirect(`${process.env.CLIENT_URL}/login`);
  }
};