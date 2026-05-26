import { Router } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { db, donationsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

const router = Router();
const JWT_SECRET = process.env.SESSION_SECRET || "aura2-secret-fallback";
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";

function verifyToken(authHeader: string | undefined): string | null {
  if (!authHeader?.startsWith("Bearer ")) return null;
  try {
    const payload = jwt.verify(authHeader.slice(7), JWT_SECRET) as { username: string };
    return payload.username;
  } catch {
    return null;
  }
}

const createDonationSchema = z.object({
  packageLabel: z.string().min(1).max(60),
  coinsAmount: z.number().int().positive(),
  priceBrl: z.number().int().positive(),
});

router.post("/donations", async (req, res) => {
  const username = verifyToken(req.headers.authorization);
  if (!username) {
    res.status(401).json({ error: "Não autenticado." });
    return;
  }

  const parsed = createDonationSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Dados inválidos." });
    return;
  }

  try {
    const [donation] = await db.insert(donationsTable).values({
      username,
      packageLabel: parsed.data.packageLabel,
      coinsAmount: parsed.data.coinsAmount,
      priceBrl: parsed.data.priceBrl,
      status: "pending",
    }).returning();

    req.log.info({ username, donationId: donation.id }, "Donation registered");
    res.status(201).json({ id: donation.id, message: "Doação registrada! Aguarde confirmação." });
  } catch (err) {
    req.log.error({ err }, "DB error creating donation");
    res.status(503).json({ error: "Erro ao registrar doação. Tenta novamente." });
  }
});

router.get("/donations/mine", async (req, res) => {
  const username = verifyToken(req.headers.authorization);
  if (!username) {
    res.status(401).json({ error: "Não autenticado." });
    return;
  }

  try {
    const donations = await db
      .select()
      .from(donationsTable)
      .where(eq(donationsTable.username, username))
      .orderBy(desc(donationsTable.createdAt))
      .limit(20);

    res.json({ donations });
  } catch (err) {
    req.log.error({ err }, "DB error fetching user donations");
    res.status(503).json({ error: "Erro ao buscar doações." });
  }
});

router.get("/admin/donations", async (req, res) => {
  const username = verifyToken(req.headers.authorization);
  if (!username || username !== ADMIN_USERNAME) {
    res.status(403).json({ error: "Acesso negado." });
    return;
  }

  try {
    const donations = await db
      .select()
      .from(donationsTable)
      .orderBy(desc(donationsTable.createdAt))
      .limit(100);

    res.json({ donations });
  } catch (err) {
    req.log.error({ err }, "DB error fetching all donations");
    res.status(503).json({ error: "Erro ao buscar doações." });
  }
});

const approveSchema = z.object({
  notes: z.string().optional(),
});

router.post("/admin/donations/:id/approve", async (req, res) => {
  const username = verifyToken(req.headers.authorization);
  if (!username || username !== ADMIN_USERNAME) {
    res.status(403).json({ error: "Acesso negado." });
    return;
  }

  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "ID inválido." });
    return;
  }

  const parsed = approveSchema.safeParse(req.body);
  const notes = parsed.success ? parsed.data.notes : undefined;

  try {
    const [updated] = await db
      .update(donationsTable)
      .set({ status: "approved", notes: notes ?? null, updatedAt: new Date() })
      .where(eq(donationsTable.id, id))
      .returning();

    if (!updated) {
      res.status(404).json({ error: "Doação não encontrada." });
      return;
    }

    req.log.info({ adminUsername: username, donationId: id }, "Donation approved");
    res.json({ message: "Doação aprovada!", donation: updated });
  } catch (err) {
    req.log.error({ err }, "DB error approving donation");
    res.status(503).json({ error: "Erro ao aprovar doação." });
  }
});

router.post("/admin/donations/:id/reject", async (req, res) => {
  const username = verifyToken(req.headers.authorization);
  if (!username || username !== ADMIN_USERNAME) {
    res.status(403).json({ error: "Acesso negado." });
    return;
  }

  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "ID inválido." });
    return;
  }

  const parsed = approveSchema.safeParse(req.body);
  const notes = parsed.success ? parsed.data.notes : undefined;

  try {
    const [updated] = await db
      .update(donationsTable)
      .set({ status: "rejected", notes: notes ?? null, updatedAt: new Date() })
      .where(eq(donationsTable.id, id))
      .returning();

    if (!updated) {
      res.status(404).json({ error: "Doação não encontrada." });
      return;
    }

    req.log.info({ adminUsername: username, donationId: id }, "Donation rejected");
    res.json({ message: "Doação rejeitada.", donation: updated });
  } catch (err) {
    req.log.error({ err }, "DB error rejecting donation");
    res.status(503).json({ error: "Erro ao rejeitar doação." });
  }
});

export default router;
