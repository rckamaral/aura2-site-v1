import { Router } from "express";
import bcrypt from "bcryptjs";
import { db, accountsTable } from "@workspace/db";
import { eq, or } from "drizzle-orm";
import { z } from "zod";

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

  const existing = await db
    .select()
    .from(accountsTable)
    .where(or(eq(accountsTable.username, username), eq(accountsTable.email, email)))
    .limit(1);

  if (existing.length > 0) {
    const conflict = existing[0].username === username ? "Usuário" : "E-mail";
    res.status(409).json({ error: `${conflict} já está em uso.` });
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(accountsTable).values({ username, email, passwordHash });

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

  const accounts = await db
    .select()
    .from(accountsTable)
    .where(eq(accountsTable.username, username))
    .limit(1);

  if (accounts.length === 0) {
    res.status(401).json({ error: "Usuário ou senha incorretos." });
    return;
  }

  const account = accounts[0];
  const valid = await bcrypt.compare(password, account.passwordHash);

  if (!valid) {
    res.status(401).json({ error: "Usuário ou senha incorretos." });
    return;
  }

  req.log.info({ username }, "Account logged in");
  res.json({ message: "Login realizado com sucesso!", username });
});

export default router;
