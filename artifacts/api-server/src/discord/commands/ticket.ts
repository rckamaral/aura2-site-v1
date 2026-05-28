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
import type { Command } from "../client.js";

export const setupTickets: Command = {
  data: (new SlashCommandBuilder()
    .setName("setup-tickets")
    .setDescription("Posta o painel de abertura de tickets (apenas admins)")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)) as unknown as SlashCommandBuilder,

  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply({ ephemeral: true });

    const embed = new EmbedBuilder()
      .setTitle("🎫 Suporte Aura2")
      .setDescription(
        "Precisa de ajuda? Clique no botão abaixo para abrir um ticket privado com nossa equipe.\n\n" +
        "**Antes de abrir um ticket:**\n" +
        "• Leia o `#faq` para respostas rápidas\n" +
        "• Use tickets somente para problemas sérios\n" +
        "• Seja educado e claro ao descrever o problema",
      )
      .setColor(0xd4a017)
      .setFooter({ text: "Aura2 — Suporte oficial" });

    const button = new ButtonBuilder()
      .setCustomId("open_ticket")
      .setLabel("Abrir Ticket")
      .setEmoji("🎫")
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

    await (interaction.channel as TextChannel | null)?.send({ embeds: [embed], components: [row] });
    await interaction.editReply("Painel de tickets postado com sucesso!");
  },
};
