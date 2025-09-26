export const sendtoken = (user, statusCode, res) => {
  const token = user.getjwttoken()
  const option = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
  }
  try {
    res.status(statusCode).cookie("token", token, option).json({ success: true, id: user._id, token })
  } catch (err) {
    console.log(err)
  }
}
