import { EmbedBuilder, TextChannel } from "discord.js";
import client from "./client.js";
import { logger } from "../lib/logger.js";

async function getTextChannel(channelId: string | undefined): Promise<TextChannel | null> {
  if (!channelId || !client.isReady()) return null;
  try {
    const channel = await client.channels.fetch(channelId);
    if (channel instanceof TextChannel) return channel;
  } catch {
    // channel not found or no access
  }
  return null;
}

export async function notifyNewUser(username: string): Promise<void> {
  const channel = await getTextChannel(process.env.DISCORD_NOVOS_MEMBROS_CHANNEL_ID);
  if (!channel) return;
  try {
    const embed = new EmbedBuilder()
      .setTitle("⚔️ Novo Guerreiro!")
      .setDescription(`**${username}** acabou de criar uma conta no Aura2!\nBem-vindo ao servidor!`)
      .setColor(0xd4a017)
      .setTimestamp()
      .setFooter({ text: "Aura2 — Reviva a Essência do Metin2" });
    await channel.send({ embeds: [embed] });
  } catch (err) {
    logger.warn({ err }, "Discord: failed to send new user notification");
  }
}

export async function notifyDonation(
  username: string,
  packageLabel: string,
  coinsAmount: number,
  priceBrl: number,
): Promise<void> {
  const channel = await getTextChannel(process.env.DISCORD_DOADORES_CHANNEL_ID);
  if (!channel) return;
  try {
    const embed = new EmbedBuilder()
      .setTitle("💎 Doação Aprovada!")
      .setDescription(`**${username}** apoiou o servidor Aura2! Muito obrigado! 🙏`)
      .addFields(
        { name: "Pacote", value: packageLabel, inline: true },
        { name: "Moedas", value: `${coinsAmount.toLocaleString("pt-BR")} AC`, inline: true },
        { name: "Valor", value: `R$ ${(priceBrl / 100).toFixed(2)}`, inline: true },
      )
      .setColor(0x9b59b6)
      .setTimestamp()
      .setFooter({ text: "Aura2 — Obrigado pelo apoio!" });
    await channel.send({ embeds: [embed] });
  } catch (err) {
    logger.warn({ err }, "Discord: failed to send donation notification");
  }
}
