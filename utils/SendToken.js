export const sendtoken = (user, statusCode, res) => {
  const token = user.getjwttoken();
  const option = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true on Render (https)
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // none for cross-site
  };
  try {
    res
      .status(statusCode)
      .cookie("token", token, option)
      .json({ success: true, id: user._id, token });
  } catch (err) {
    console.log(err);
  }
};
