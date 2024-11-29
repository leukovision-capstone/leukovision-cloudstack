import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import { createUserId } from "../utils/idGenerator.js";

// Secret Key untuk JWT
const SECRET_KEY = process.env.JWT_SECRET;

// Ambil Semua User
export const getAllUsers = async (req, res) => {
  try {
    const [users] = await pool.query(
      "SELECT user_id, username, email, full_name FROM users"
    );
    res.status(200).json({
      status: "success",
      message: "Berhasil mendapatkan daftar pengguna.",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Gagal mendapatkan daftar pengguna.",
      error: error.message,
    });
  }
};

// Ambil User Berdasarkan ID
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const [user] = await pool.query(
      "SELECT user_id, username, email, full_name FROM users WHERE user_id = ?",
      [id]
    );

    if (user.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Pengguna dengan ID tersebut tidak ditemukan.",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Berhasil mendapatkan data pengguna.",
      data: user[0],
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Gagal mendapatkan data pengguna.",
      error: error.message,
    });
  }
};

// Tambah User Baru (Register)
export const createUser = async (req, res) => {
  const { username, password, email, full_name } = req.body;

  if (!username || !password || !email || !full_name) {
    return res.status(400).json({
      status: "fail",
      message:
        "Semua field (username, password, email, full_name) harus diisi.",
    });
  }

  try {
    const [existingUser] = await pool.query(
      "SELECT username, email FROM users WHERE username = ? OR email = ?",
      [username, email]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({
        status: "fail",
        message: "Username atau email sudah digunakan.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = createUserId();

    await pool.query(
      "INSERT INTO users (user_id, username, password, email, full_name) VALUES (?, ?, ?, ?, ?)",
      [userId, username, hashedPassword, email, full_name]
    );

    res.status(201).json({
      status: "success",
      message: "Pengguna berhasil dibuat.",
      data: { user_id: userId },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Gagal membuat pengguna baru.",
      error: error.message,
    });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Username dan password harus diisi.",
    });
  }

  try {
    const [users] = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    const user = users[0];

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "Pengguna tidak ditemukan.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: "fail",
        message: "Password salah.",
      });
    }

    const token = jwt.sign(
      { user_id: user.user_id, username: user.username },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      status: "success",
      message: "Login berhasil.",
      data: { token },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan saat login.",
      error: error.message,
    });
  }
};

// Update User
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password, email, full_name } = req.body;

  try {
    const [existingUser] = await pool.query(
      "SELECT * FROM users WHERE user_id = ?",
      [id]
    );

    if (existingUser.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Pengguna dengan ID tersebut tidak ditemukan.",
      });
    }

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : existingUser[0].password;

    await pool.query(
      "UPDATE users SET username = ?, password = ?, email = ?, full_name = ?, updated_at = NOW() WHERE user_id = ?",
      [
        username || existingUser[0].username,
        hashedPassword,
        email || existingUser[0].email,
        full_name || existingUser[0].full_name,
        id,
      ]
    );

    res.status(200).json({
      status: "success",
      message: "Pengguna berhasil diperbarui.",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Gagal memperbarui data pengguna.",
      error: error.message,
    });
  }
};

// Hapus User
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const [user] = await pool.query("SELECT * FROM users WHERE user_id = ?", [
      id,
    ]);

    if (user.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Pengguna tidak ditemukan.",
      });
    }

    await pool.query("DELETE FROM users WHERE user_id = ?", [id]);

    res
      .status(200)
      .json({ status: "success", message: "Pengguna berhasil dihapus." });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Gagal menghapus pengguna.",
      error: error.message,
    });
  }
};
