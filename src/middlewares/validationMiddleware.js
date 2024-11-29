import Joi from "joi";

// Validasi Register
const createUserSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9._]+$/)
    .required()
    .messages({
      "string.pattern.base":
        "Username hanya boleh terdiri dari huruf, angka, titik, atau garis bawah.",
      "string.empty": "Username tidak boleh kosong.",
      "string.min": "Username minimal 3 karakter.",
      "string.max": "Username maksimal 20 karakter.",
    }),
  email: Joi.string().email().required().messages({
    "string.email": "Email harus valid.",
    "string.empty": "Email tidak boleh kosong.",
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password minimal 8 karakter.",
    "string.empty": "Password tidak boleh kosong.",
  }),
  full_name: Joi.string().required().messages({
    "string.empty": "Nama lengkap tidak boleh kosong.",
  }),
});

// Validasi Login
const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

// Middleware Validasi
export const validateUserInput = (req, res, next) => {
  const { error } = createUserSchema.validate(req.body);
  if (error)
    return res.status(400).json({ status: "fail", message: error.message });
  next();
};

export const validateLoginInput = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error)
    return res.status(400).json({ status: "fail", message: error.message });
  next();
};
