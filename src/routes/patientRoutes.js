import express from "express";
import {
  storePatient,
  indexPatients,
  showPatient,
  updatePatientById,
  deletePatientById,
} from "../controllers/patientController.js";

const router = express.Router();

/**
 * @swagger
 * /api/patients:
 *   post:
 *     summary: Menambahkan pasien baru
 *     tags:
 *       - Patients
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nama pasien
 *               age:
 *                 type: integer
 *                 description: Umur pasien
 *               gender:
 *                 type: string
 *                 description: Jenis kelamin pasien
 *               address:
 *                 type: string
 *                 description: Alamat pasien
 *     responses:
 *       201:
 *         description: Pasien berhasil ditambahkan
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
 *                     patient_id:
 *                       type: string
 *                       description: ID unik pasien
 *       400:
 *         description: Data input tidak valid
 */
router.post("/", storePatient);

/**
 * @swagger
 * /api/patients:
 *   get:
 *     summary: Mendapatkan semua pasien
 *     tags:
 *       - Patients
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan daftar pasien
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
 *                       patient_id:
 *                         type: string
 *                         description: ID unik pasien
 *                       name:
 *                         type: string
 *                       age:
 *                         type: integer
 *                       gender:
 *                         type: string
 *                       address:
 *                         type: string
 *       404:
 *         description: Tidak ada pasien yang ditemukan
 */
router.get("/", indexPatients);

/**
 * @swagger
 * /api/patients/{id}:
 *   get:
 *     summary: Mendapatkan pasien berdasarkan ID
 *     tags:
 *       - Patients
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID unik pasien
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan data pasien
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
 *                     patient_id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     age:
 *                       type: integer
 *                     gender:
 *                       type: string
 *                     address:
 *                       type: string
 *       404:
 *         description: Pasien tidak ditemukan
 */
router.get("/:id", showPatient);

/**
 * @swagger
 * /api/patients/{id}:
 *   put:
 *     summary: Memperbarui data pasien berdasarkan ID
 *     tags:
 *       - Patients
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID unik pasien
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nama pasien
 *               age:
 *                 type: integer
 *                 description: Umur pasien
 *               gender:
 *                 type: string
 *                 description: Jenis kelamin pasien
 *               address:
 *                 type: string
 *                 description: Alamat pasien
 *     responses:
 *       200:
 *         description: Pasien berhasil diperbarui
 *       404:
 *         description: Pasien tidak ditemukan
 */
router.put("/:id", updatePatientById);

/**
 * @swagger
 * /api/patients/{id}:
 *   delete:
 *     summary: Menghapus pasien berdasarkan ID
 *     tags:
 *       - Patients
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID unik pasien
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pasien berhasil dihapus
 *       404:
 *         description: Pasien tidak ditemukan
 */
router.delete("/:id", deletePatientById);

export default router;
