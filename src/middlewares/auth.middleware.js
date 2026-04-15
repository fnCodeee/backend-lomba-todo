import { verifyToken } from "../utils/jwt.js";

export default (req, res, next) => {
  try {
    // ambil data authorization dari req.headers
    const authorization = req.headers.authorization;
    // pisahkan menjadi array menggunakan split berdasarkan spasi
    if(!authorization) {
      return res.status(403).json({
        success: false,
        message: "No Token",
        data: null
      })
    }
    const [prefix, token] = authorization.split(" ");
    // jika tidak ada (prefix === "Bearer" dan token), maka status 403 unauthorization
    if (!(prefix === "Bearer" && token)) {
      return res.status(403).json({
        success: false,
        message: "No Token",
        data: null,
      });
    }
    // decode save ke req.user
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message})
  }
};
