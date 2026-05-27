import { Router } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { db, donationsTable, accountsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

const router = Router();
const JWT_SECRET = process.env.SESSION_SECRET || "aura2-secret-fallback";
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN || "";

function verifyToken(authHeader: string | undefined): string | null {
  if (!authHeader?.startsWith("Bearer ")) return null;
  try {
    const payload = jwt.verify(authHeader.slice(7), JWT_SECRET) as { username: string };
    return payload.username;
  } catch {
    return null;
  }
}

function getWebhookUrl(): string {
  const domain = process.env.REPLIT_DOMAINS?.split(",")[0] || "aura2.com.br";
  return `https://${domain}/api/webhooks/mercadopago`;
}

const createPixSchema = z.object({
  packageLabel: z.string().min(1).max(60),
  coinsAmount: z.number().int().positive(),
  priceBrl: z.number().int().positive(),
});

router.post("/donations/create-pix", async (req, res) => {
  const username = verifyToken(req.headers.authorization);
  if (!username) {
    res.status(401).json({ error: "Não autenticado." });
    return;
  }

  const parsed = createPixSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Dados inválidos." });
    return;
  }

  const { packageLabel, coinsAmount, priceBrl } = parsed.data;

  // Fetch real email from the database
  const [account] = await db
    .select({ email: accountsTable.email })
    .from(accountsTable)
    .where(eq(accountsTable.username, username))
    .limit(1);
  const payerEmail = account?.email || "jogador@aura2.com.br";

  try {
    const mpRes = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
        "X-Idempotency-Key": `${username}-${Date.now()}`,
      },
      body: JSON.stringify({
        transaction_amount: priceBrl,
        description: `Aura2 - ${packageLabel}`,
        payment_method_id: "pix",
        payer: {
          email: payerEmail,
          first_name: username,
        },
        notification_url: getWebhookUrl(),
      }),
    });

    if (!mpRes.ok) {
      const err = await mpRes.text();
      req.log.error({ err, status: mpRes.status }, "MP API error creating payment");
      res.status(502).json({ error: "Erro ao gerar QR code. Tenta novamente." });
      return;
    }

    const mpData = await mpRes.json() as {
      id: number;
      point_of_interaction?: {
        transaction_data?: {
          qr_code?: string;
          qr_code_base64?: string;
          ticket_url?: string;
        };
      };
    };

    const paymentId = String(mpData.id);
    const txData = mpData.point_of_interaction?.transaction_data;
    const qrCode = txData?.qr_code;
    const qrCodeBase64 = txData?.qr_code_base64;

    const [donation] = await db.insert(donationsTable).values({
      username,
      packageLabel,
      coinsAmount,
      priceBrl,
      status: "pending",
      mpPaymentId: paymentId,
    }).returning();

    req.log.info({ username, donationId: donation.id, paymentId }, "PIX payment created");

    res.status(201).json({
      donationId: donation.id,
      paymentId,
      qrCode,
      qrCodeBase64,
    });
  } catch (err) {
    req.log.error({ err }, "Error creating PIX payment");
    res.status(503).json({ error: "Erro ao criar pagamento. Tenta novamente." });
  }
});

router.post("/webhooks/mercadopago", async (req, res) => {
  res.status(200).send("OK");

  try {
    const body = req.body as { type?: string; data?: { id?: string }; action?: string };
    if (body.type !== "payment" && body.action !== "payment.updated") return;

    const paymentId = body.data?.id;
    if (!paymentId) return;

    const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` },
    });
    if (!mpRes.ok) return;

    const payment = await mpRes.json() as { status?: string; id?: number };
    if (payment.status !== "approved") return;

    const donations = await db
      .select()
      .from(donationsTable)
      .where(eq(donationsTable.mpPaymentId, String(payment.id)))
      .limit(1);

    if (!donations.length || donations[0].status === "approved") return;

    await db
      .update(donationsTable)
      .set({ status: "approved", notes: "Confirmado automaticamente via Mercado Pago", updatedAt: new Date() })
      .where(eq(donationsTable.id, donations[0].id));

    req.log.info({ donationId: donations[0].id, paymentId }, "Donation auto-approved via webhook");
  } catch (err) {
    req.log.error({ err }, "Error processing MP webhook");
  }
});

router.get("/donations/:id/status", async (req, res) => {
  const username = verifyToken(req.headers.authorization);
  if (!username) { res.status(401).json({ error: "Não autenticado." }); return; }

  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "ID inválido." }); return; }

  try {
    const [donation] = await db.select().from(donationsTable).where(eq(donationsTable.id, id)).limit(1);
    if (!donation) { res.status(404).json({ error: "Não encontrado." }); return; }
    if (donation.username !== username) { res.status(403).json({ error: "Acesso negado." }); return; }
    res.json({ status: donation.status });
  } catch (err) {
    req.log.error({ err }, "DB error fetching donation status");
    res.status(503).json({ error: "Erro." });
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

const actionSchema = z.object({
  notes: z.string().optional(),
});

router.post("/admin/donations/:id/approve", async (req, res) => {
  const username = verifyToken(req.headers.authorization);
  if (!username || username !== ADMIN_USERNAME) {
    res.status(403).json({ error: "Acesso negado." });
    return;
  }

  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "ID inválido." }); return; }

  const notes = actionSchema.safeParse(req.body).success ? actionSchema.parse(req.body).notes : undefined;

  try {
    const [updated] = await db
      .update(donationsTable)
      .set({ status: "approved", notes: notes ?? null, updatedAt: new Date() })
      .where(eq(donationsTable.id, id))
      .returning();

    if (!updated) { res.status(404).json({ error: "Doação não encontrada." }); return; }
    req.log.info({ adminUsername: username, donationId: id }, "Donation approved manually");
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
  if (isNaN(id)) { res.status(400).json({ error: "ID inválido." }); return; }

  const notes = actionSchema.safeParse(req.body).success ? actionSchema.parse(req.body).notes : undefined;

  try {
    const [updated] = await db
      .update(donationsTable)
      .set({ status: "rejected", notes: notes ?? null, updatedAt: new Date() })
      .where(eq(donationsTable.id, id))
      .returning();

    if (!updated) { res.status(404).json({ error: "Doação não encontrada." }); return; }
    req.log.info({ adminUsername: username, donationId: id }, "Donation rejected manually");
    res.json({ message: "Doação rejeitada.", donation: updated });
  } catch (err) {
    req.log.error({ err }, "DB error rejecting donation");
    res.status(503).json({ error: "Erro ao rejeitar doação." });
  }
});

export default router;
