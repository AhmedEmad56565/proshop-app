export default function getRespnse(res, user, status = 200) {
  return res.status(status).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
}
