import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} from "../controllers/userController.js";
import {
  validateUserInput,
  validateLoginInput,
} from "../middlewares/validationMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Mendapatkan semua pengguna
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan daftar pengguna
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user_id:
 *                         type: string
 *                         description: ID unik pengguna
 *                       username:
 *                         type: string
 *                         description: Username pengguna
 *                       email:
 *                         type: string
 *                         description: Email pengguna
 *                       full_name:
 *                         type: string
 *                         description: Nama lengkap pengguna
 */
router.get("/", getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Mendapatkan data pengguna berdasarkan ID
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID unik pengguna
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan data pengguna
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                     full_name:
 *                       type: string
 *       404:
 *         description: Pengguna tidak ditemukan
 */
router.get("/:id", getUserById);

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Menambahkan pengguna baru (register)
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username pengguna
 *               password:
 *                 type: string
 *                 description: Password pengguna
 *               email:
 *                 type: string
 *                 description: Email pengguna
 *               full_name:
 *                 type: string
 *                 description: Nama lengkap pengguna
 *     responses:
 *       201:
 *         description: Berhasil menambahkan pengguna baru
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: string
 *       400:
 *         description: Data input tidak valid
 */
router.post("/register", validateUserInput, createUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login pengguna
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username pengguna
 *               password:
 *                 type: string
 *                 description: Password pengguna
 *     responses:
 *       200:
 *         description: Login berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: Token autentikasi
 *       401:
 *         description: Login gagal, username atau password salah
 */
router.post("/login", validateLoginInput, loginUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Memperbarui data pengguna
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID unik pengguna
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username pengguna
 *               password:
 *                 type: string
 *                 description: Password pengguna
 *               email:
 *                 type: string
 *                 description: Email pengguna
 *               full_name:
 *                 type: string
 *                 description: Nama lengkap pengguna
 *     responses:
 *       200:
 *         description: Berhasil memperbarui data pengguna
 *       404:
 *         description: Pengguna tidak ditemukan
 */
router.put("/:id", updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Menghapus pengguna
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID unik pengguna
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Berhasil menghapus pengguna
 *       404:
 *         description: Pengguna tidak ditemukan
 */
router.delete("/:id", deleteUser);

export default router;
