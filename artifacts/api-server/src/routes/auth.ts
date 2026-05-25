import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import pool from "../lib/mysql";

const router = Router();

const registerSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

router.post("/auth/register", async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Dados inválidos. Verifique os campos." });
    return;
  }

  const { username, email, password } = parsed.data;

  const [existing] = await pool.execute(
    "SELECT id FROM accounts WHERE username = ? OR email = ? LIMIT 1",
    [username, email]
  ) as [any[], any];

  if (existing.length > 0) {
    res.status(409).json({ error: "Usuário ou e-mail já está em uso." });
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await pool.execute(
    "INSERT INTO accounts (username, email, password_hash) VALUES (?, ?, ?)",
    [username, email, passwordHash]
  );

  req.log.info({ username }, "New account registered");
  res.status(201).json({ message: "Conta criada com sucesso!", username });
});

router.post("/auth/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Dados inválidos." });
    return;
  }

  const { username, password } = parsed.data;

  const [rows] = await pool.execute(
    "SELECT id, password_hash FROM accounts WHERE username = ? LIMIT 1",
    [username]
  ) as [any[], any];

  if (rows.length === 0) {
    res.status(401).json({ error: "Usuário ou senha incorretos." });
    return;
  }

  const valid = await bcrypt.compare(password, rows[0].password_hash);
  if (!valid) {
    res.status(401).json({ error: "Usuário ou senha incorretos." });
    return;
  }

  req.log.info({ username }, "Account logged in");
  res.json({ message: "Login realizado com sucesso!", username });
});

export default router;
