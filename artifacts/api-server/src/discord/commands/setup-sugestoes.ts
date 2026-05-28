import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  PermissionFlagsBits,
  TextChannel,
} from "discord.js";
import { logger } from "../../lib/logger.js";

export const setupSugestoes = {
  data: new SlashCommandBuilder()
    .setName("setup-sugestoes")
    .setDescription("Posta o painel de sugestões da comunidade (apenas admins)")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.deferReply({ ephemeral: true });

    const channel = interaction.channel as TextChannel | null;
    if (!channel) {
      await interaction.editReply("Erro: canal não encontrado.");
      return;
    }

    try {
      const embed = new EmbedBuilder()
        .setTitle("💬 Central de Sugestões")
        .setDescription(
          "Ajude a melhorar o servidor com suas ideias.\n" +
          "Clique no botão abaixo para enviar sua sugestão.",
        )
        .setColor(0x2ecc71);

      const button = new ButtonBuilder()
        .setCustomId("suggest_open")
        .setLabel("💡 Enviar Sugestão")
        .setStyle(ButtonStyle.Success);

      const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

      await channel.send({ embeds: [embed], components: [row] });
      await interaction.editReply("✅ Painel de sugestões postado!");
      logger.info({ channel: channel.name }, "Discord: setup-sugestoes posted");
    } catch (err) {
      logger.warn({ err }, "Discord: failed to post sugestoes panel");
      await interaction.editReply("Erro ao postar o painel.");
    }
  },
};
