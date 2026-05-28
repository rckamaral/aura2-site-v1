import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  TextChannel,
} from "discord.js";
import { logger } from "../../lib/logger.js";

const CHANNEL_RENAMES: Record<string, string> = {
  "bem-vindo":     "「👋」bem-vindo",
  "regras":        "「📋」regras",
  "aura2-com-br":  "「🌐」aura2-com-br",
  "anuncios":      "「📣」anuncios",
  "enquetes":      "「📊」enquetes",
  "bate-papo":     "「💬」bate-papo",
  "sugestoes":     "「📝」sugestoes",
  "abrir-ticket":  "「🎫」abrir-ticket",
  "novos-membros": "「👤」novos-membros",
  "doadores":      "「💰」doadores",
};

export const setupEmojis = {
  data: new SlashCommandBuilder()
    .setName("setup-emojis")
    .setDescription("Adiciona emojis nos nomes dos canais (apenas admins)")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.deferReply({ ephemeral: true });

    const guild = interaction.guild;
    if (!guild) {
      await interaction.editReply("Erro: servidor não encontrado.");
      return;
    }

    await guild.channels.fetch();

    let renamed = 0;
    let skipped = 0;
    const errors: string[] = [];

    for (const [oldName, newName] of Object.entries(CHANNEL_RENAMES)) {
      const channel = guild.channels.cache.find(
        (ch) => ch.name === oldName,
      ) as TextChannel | undefined;

      if (!channel) {
        skipped++;
        continue;
      }

      try {
        await channel.setName(newName);
        renamed++;
        logger.info({ from: oldName, to: newName }, "Discord: channel renamed");
        // Small delay to avoid rate limits
        await new Promise((r) => setTimeout(r, 1000));
      } catch (err) {
        errors.push(oldName);
        logger.warn({ err, channel: oldName }, "Discord: failed to rename channel");
      }
    }

    const lines = [
      `✅ **${renamed}** canais renomeados com sucesso!`,
      skipped > 0 ? `⚠️ ${skipped} canais não encontrados (já renomeados ou com nome diferente).` : null,
      errors.length > 0 ? `❌ Erros em: ${errors.join(", ")}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    await interaction.editReply(lines);
  },
};
