import {
  Interaction,
  ButtonInteraction,
  ChatInputCommandInteraction,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  PermissionFlagsBits,
  ChannelType,
  TextChannel,
} from "discord.js";
import { commands } from "../client.js";
import { logger } from "../../lib/logger.js";

async function handleOpenTicket(interaction: ButtonInteraction): Promise<void> {
  await interaction.deferReply({ ephemeral: true });

  const guild = interaction.guild;
  if (!guild) return;

  const categoryId = process.env.DISCORD_TICKET_CATEGORY_ID;
  const staffRoleId = process.env.DISCORD_STAFF_ROLE_ID;
  const user = interaction.user;

  // Check for existing open ticket
  const existing = guild.channels.cache.find(
    (ch) => ch.name === `ticket-${user.username}`,
  );
  if (existing) {
    await interaction.editReply(`Você já tem um ticket aberto: ${existing}`);
    return;
  }

  try {
    const permissionOverwrites = [
      {
        id: guild.id,
        deny: [PermissionFlagsBits.ViewChannel],
      },
      {
        id: user.id,
        allow: [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.SendMessages,
          PermissionFlagsBits.ReadMessageHistory,
        ],
      },
      ...(staffRoleId ? [{
        id: staffRoleId,
        allow: [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.SendMessages,
          PermissionFlagsBits.ReadMessageHistory,
          PermissionFlagsBits.ManageMessages,
        ],
      }] : []),
    ];

    const channel = await guild.channels.create({
      name: `ticket-${user.username}`,
      type: ChannelType.GuildText,
      topic: `Ticket de suporte — ID do usuário: ${user.id}`,
      parent: categoryId ?? undefined,
      permissionOverwrites,
    });

    const embed = new EmbedBuilder()
      .setTitle("🎫 Ticket Aberto")
      .setDescription(
        `Olá, ${user}! Nossa equipe irá atendê-lo em breve.\n\n` +
        "**Descreva seu problema com o máximo de detalhes possível.**\n" +
        "Quando o problema for resolvido, clique no botão abaixo para fechar o ticket.",
      )
      .setColor(0xd4a017)
      .setTimestamp();

    const closeButton = new ButtonBuilder()
      .setCustomId("close_ticket")
      .setLabel("Fechar Ticket")
      .setEmoji("🔒")
      .setStyle(ButtonStyle.Danger);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(closeButton);

    await channel.send({
      content: staffRoleId ? `${user} <@&${staffRoleId}>` : `${user}`,
      embeds: [embed],
      components: [row],
    });

    await interaction.editReply(`Ticket criado! ${channel}`);
  } catch (err) {
    logger.warn({ err }, "Discord: failed to create ticket channel");
    await interaction.editReply("Erro ao criar o ticket. Contate um administrador.");
  }
}

async function handleCloseTicket(interaction: ButtonInteraction): Promise<void> {
  await interaction.deferReply({ ephemeral: true });

  const channel = interaction.channel as TextChannel | null;
  if (!channel) return;

  const embed = new EmbedBuilder()
    .setTitle("🔒 Ticket Encerrado")
    .setDescription(
      `Ticket encerrado por ${interaction.user}.\nEste canal será removido em 5 segundos.`,
    )
    .setColor(0xe74c3c)
    .setTimestamp();

  await channel.send({ embeds: [embed] });
  await interaction.editReply("Ticket encerrado. Canal sendo removido...");

  setTimeout(async () => {
    try {
      await channel.delete("Ticket encerrado");
    } catch (err) {
      logger.warn({ err }, "Discord: failed to delete ticket channel");
    }
  }, 5000);
}

export async function onInteractionCreate(interaction: Interaction): Promise<void> {
  if (interaction.isChatInputCommand()) {
    const command = commands.get(interaction.commandName);
    if (!command) return;
    try {
      await command.execute(interaction as ChatInputCommandInteraction);
    } catch (err) {
      logger.warn({ err, command: interaction.commandName }, "Discord: slash command error");
      const msg = { content: "Erro ao executar o comando.", ephemeral: true };
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp(msg);
      } else {
        await interaction.reply(msg);
      }
    }
    return;
  }

  if (interaction.isButton()) {
    if (interaction.customId === "open_ticket") {
      await handleOpenTicket(interaction);
    } else if (interaction.customId === "close_ticket") {
      await handleCloseTicket(interaction);
    }
  }
}
