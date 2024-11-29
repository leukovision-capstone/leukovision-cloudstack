import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

export const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Akses ditolak, token tidak ditemukan." });
  }
  try {
    const user = jwt.verify(token, SECRET_KEY);
    req.user = user; // Simpan data pengguna di request
    next();
  } catch {
    res.status(403).json({ message: "Token tidak valid." });
  }
};
