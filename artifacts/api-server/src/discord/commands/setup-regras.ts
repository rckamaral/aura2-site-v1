import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionFlagsBits,
  TextChannel,
} from "discord.js";
import { logger } from "../../lib/logger.js";

export const setupRegras = {
  data: new SlashCommandBuilder()
    .setName("setup-regras")
    .setDescription("Posta o embed de regras da comunidade (apenas admins)")
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
        .setTitle("📋 Regras da Comunidade")
        .setDescription(
          "**1. Respeito Mútuo**\n" +
          "• É proibido qualquer tipo de discriminação.\n" +
          "• Ataques pessoais e provocações não serão tolerados.\n\n" +
          "**2. Termos de Serviço do Discord**\n" +
          "• É proibido compartilhar conteúdo ilegal, prejudicial ou explícito.\n" +
          "• Não utilize bots não autorizados ou ferramentas de terceiros.\n" +
          "• Para mais detalhes, consulte os [Termos de Serviço do Discord](https://discord.com/terms).\n\n" +
          "**3. Privacidade e Segurança**\n" +
          "• Não compartilhe informações pessoais de outros membros.\n\n" +
          "**4. Sem Spam ou Flood**\n" +
          "• Evite mensagens repetidas, letras maiúsculas excessivas ou links não solicitados.\n\n" +
          "**5. Sem Divulgação**\n" +
          "• É proibido divulgar outros servidores Metin2 ou serviços concorrentes.\n\n" +
          "*⚠️ O descumprimento das regras pode resultar em advertência, mute, suspensão ou banimento permanente.*",
        )
        .setColor(0xe74c3c)
        .setThumbnail("https://cdn.discordapp.com/emojis/🛑.png")
        .setTimestamp();

      await channel.send({ embeds: [embed] });
      await interaction.editReply("✅ Regras postadas!");
      logger.info({ channel: channel.name }, "Discord: setup-regras posted");
    } catch (err) {
      logger.warn({ err }, "Discord: failed to post regras");
      await interaction.editReply("Erro ao postar as regras.");
    }
  },
};
