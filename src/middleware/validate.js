import { z } from "zod";

export const validate = (schema) => (req, res, next) => {
  try {
    const data = schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    req.body = data.body ?? req.body; // normalized
    next();
  } catch (err) {
    const issues =
      err?.issues?.map((i) => ({
        path: i.path.join("."),
        message: i.message,
      })) ?? [];
    res.status(400).json({ error: "Validation failed", issues });
  }
};

export const schemas = {
  register: z.object({
    body: z.object({
      name: z.string().min(2),
      email: z.string().email(),
      password: z.string().min(8),
    }),
  }),
  login: z.object({
    body: z.object({
      email: z.string().email(),
      password: z.string().min(8),
    }),
  }),
  updateUser: z.object({
    body: z.object({
      role: z.enum(["user", "admin"]).optional(),
      isActive: z.boolean().optional(),
    }),
  }),
};
