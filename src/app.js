import express from "express";
import { setupSwagger } from "./config/swagger.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import analysisHistoryRoutes from "./routes/analysisHistoryRoutes.js";

const app = express();

// Middleware
app.use(express.json()); // Parsing JSON
app.use(cors()); // Aktifkan CORS

// Prefix API Routes
app.use("/api/users", userRoutes); // Semua endpoint user akan memiliki prefix /api/users
app.use("/api/patients", patientRoutes);
app.use("/api/analysis_history", analysisHistoryRoutes);

// Swagger Setup
setupSwagger(app);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(
    `API documentation available at http://localhost:${PORT}/api-docs`
  );
});
