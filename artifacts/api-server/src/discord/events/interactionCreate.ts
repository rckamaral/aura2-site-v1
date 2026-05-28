import {
  Interaction,
  ButtonInteraction,
  ChatInputCommandInteraction,
  ModalSubmitInteraction,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  PermissionFlagsBits,
  ChannelType,
  TextChannel,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import { commands } from "../client.js";
import { logger } from "../../lib/logger.js";

// In-memory vote tracking: messageId → { favor: Set<userId>, contra: Set<userId> }
const votes = new Map<string, { favor: Set<string>; contra: Set<string> }>();

function buildSuggestionEmbed(
  author: string,
  authorAvatar: string | null,
  text: string,
  favor: number,
  contra: number,
  status: "pendente" | "aprovada" | "reprovada",
): EmbedBuilder {
  const total = favor + contra;
  const favorPct = total > 0 ? Math.round((favor / total) * 100) : 0;
  const contraPct = total > 0 ? Math.round((contra / total) * 100) : 0;

  const statusColors: Record<string, number> = {
    pendente: 0xf1c40f,
    aprovada: 0x2ecc71,
    reprovada: 0xe74c3c,
  };

  const statusLabels: Record<string, string> = {
    pendente: "⏳ Pendente",
    aprovada: "✅ Aprovada",
    reprovada: "❌ Reprovada",
  };

  return new EmbedBuilder()
    .setAuthor({ name: author, iconURL: authorAvatar ?? undefined })
    .setDescription(text)
    .addFields(
      {
        name: "👍 A Favor",
        value: `${favor} votos · ${favorPct}%`,
        inline: true,
      },
      {
        name: "👎 Contra",
        value: `${contra} votos · ${contraPct}%`,
        inline: true,
      },
      { name: "Total", value: String(total), inline: true },
    )
    .setFooter({ text: statusLabels[status] })
    .setColor(statusColors[status])
    .setTimestamp();
}

function buildSuggestionComponents(
  messageId: string,
  status: "pendente" | "aprovada" | "reprovada",
): ActionRowBuilder<ButtonBuilder>[] {
  const voteRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(`suggest_favor:${messageId}`)
      .setLabel("👍 Eu Apoio")
      .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
      .setCustomId(`suggest_contra:${messageId}`)
      .setLabel("👎 Não Apoio")
      .setStyle(ButtonStyle.Danger),
  );

  const staffRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(`suggest_approve:${messageId}`)
      .setLabel("✅ Aprovar")
      .setStyle(ButtonStyle.Primary)
      .setDisabled(status === "aprovada"),
    new ButtonBuilder()
      .setCustomId(`suggest_reject:${messageId}`)
      .setLabel("❌ Reprovar")
      .setStyle(ButtonStyle.Danger)
      .setDisabled(status === "reprovada"),
  );

  return [voteRow, staffRow];
}

// ────────────────────────────── Tickets ──────────────────────────────

async function handleOpenTicket(interaction: ButtonInteraction): Promise<void> {
  await interaction.deferReply({ ephemeral: true });

  const guild = interaction.guild;
  if (!guild) return;

  const categoryId = process.env.DISCORD_TICKET_CATEGORY_ID;
  const staffRoleId = process.env.DISCORD_STAFF_ROLE_ID;
  const user = interaction.user;

  const existing = guild.channels.cache.find(
    (ch) => ch.name === `ticket-${user.username}`,
  );
  if (existing) {
    await interaction.editReply(`Você já tem um ticket aberto: ${existing}`);
    return;
  }

  try {
    const permissionOverwrites = [
      { id: guild.id, deny: [PermissionFlagsBits.ViewChannel] },
      {
        id: user.id,
        allow: [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.SendMessages,
          PermissionFlagsBits.ReadMessageHistory,
        ],
      },
      ...(staffRoleId
        ? [
            {
              id: staffRoleId,
              allow: [
                PermissionFlagsBits.ViewChannel,
                PermissionFlagsBits.SendMessages,
                PermissionFlagsBits.ReadMessageHistory,
                PermissionFlagsBits.ManageMessages,
              ],
            },
          ]
        : []),
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

// ────────────────────────────── Sugestões ──────────────────────────────

async function handleSuggestOpen(interaction: ButtonInteraction): Promise<void> {
  const modal = new ModalBuilder()
    .setCustomId("suggest_modal")
    .setTitle("Enviar Sugestão");

  const input = new TextInputBuilder()
    .setCustomId("suggest_text")
    .setLabel("Qual é a sua sugestão?")
    .setStyle(TextInputStyle.Paragraph)
    .setPlaceholder("Descreva sua ideia com o máximo de detalhes...")
    .setMinLength(10)
    .setMaxLength(1000)
    .setRequired(true);

  modal.addComponents(
    new ActionRowBuilder<TextInputBuilder>().addComponents(input),
  );

  await interaction.showModal(modal);
}

async function handleSuggestModal(interaction: ModalSubmitInteraction): Promise<void> {
  await interaction.deferReply({ ephemeral: true });

  const text = interaction.fields.getTextInputValue("suggest_text");
  const user = interaction.user;
  const channel = interaction.channel as TextChannel | null;
  if (!channel) return;

  const favor = 0;
  const contra = 0;

  const embed = buildSuggestionEmbed(
    user.tag,
    user.displayAvatarURL(),
    text,
    favor,
    contra,
    "pendente",
  );

  const msg = await channel.send({ embeds: [embed] });

  votes.set(msg.id, { favor: new Set(), contra: new Set() });

  const rows = buildSuggestionComponents(msg.id, "pendente");
  await msg.edit({ components: rows });

  await interaction.editReply("✅ Sua sugestão foi enviada!");
  logger.info({ user: user.tag, messageId: msg.id }, "Discord: suggestion submitted");
}

async function handleSuggestVote(
  interaction: ButtonInteraction,
  type: "favor" | "contra",
  messageId: string,
): Promise<void> {
  await interaction.deferReply({ ephemeral: true });

  const userId = interaction.user.id;
  let voteData = votes.get(messageId);

  if (!voteData) {
    voteData = { favor: new Set(), contra: new Set() };
    votes.set(messageId, voteData);
  }

  const opposite = type === "favor" ? "contra" : "favor";

  if (voteData[type].has(userId)) {
    voteData[type].delete(userId);
    await interaction.editReply("Seu voto foi removido.");
  } else {
    voteData[opposite].delete(userId);
    voteData[type].add(userId);
    await interaction.editReply(
      type === "favor" ? "👍 Você apoiou esta sugestão!" : "👎 Você não apoiou esta sugestão.",
    );
  }

  await refreshSuggestionEmbed(interaction, messageId, voteData, "pendente");
}

async function handleSuggestStaff(
  interaction: ButtonInteraction,
  action: "approve" | "reject",
  messageId: string,
): Promise<void> {
  const member = interaction.guild?.members.cache.get(interaction.user.id);
  const isAdmin =
    member?.permissions.has(PermissionFlagsBits.Administrator) ?? false;

  if (!isAdmin) {
    await interaction.reply({
      content: "Apenas administradores podem aprovar ou reprovar sugestões.",
      ephemeral: true,
    });
    return;
  }

  await interaction.deferReply({ ephemeral: true });

  const status = action === "approve" ? "aprovada" : "reprovada";
  const voteData = votes.get(messageId) ?? { favor: new Set(), contra: new Set() };

  await refreshSuggestionEmbed(interaction, messageId, voteData, status);
  await interaction.editReply(
    action === "approve" ? "✅ Sugestão aprovada!" : "❌ Sugestão reprovada.",
  );
}

async function refreshSuggestionEmbed(
  interaction: ButtonInteraction,
  messageId: string,
  voteData: { favor: Set<string>; contra: Set<string> },
  status: "pendente" | "aprovada" | "reprovada",
): Promise<void> {
  try {
    const channel = interaction.channel as TextChannel | null;
    if (!channel) return;

    const msg = await channel.messages.fetch(messageId);
    const oldEmbed = msg.embeds[0];
    if (!oldEmbed) return;

    const authorName = oldEmbed.author?.name ?? "Desconhecido";
    const authorIcon = oldEmbed.author?.iconURL ?? null;
    const description = oldEmbed.description ?? "";

    const newEmbed = buildSuggestionEmbed(
      authorName,
      authorIcon,
      description,
      voteData.favor.size,
      voteData.contra.size,
      status,
    );

    const rows = buildSuggestionComponents(messageId, status);
    await msg.edit({ embeds: [newEmbed], components: rows });
  } catch (err) {
    logger.warn({ err, messageId }, "Discord: failed to refresh suggestion embed");
  }
}

// ────────────────────────────── Main handler ──────────────────────────────

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

  if (interaction.isModalSubmit()) {
    if (interaction.customId === "suggest_modal") {
      await handleSuggestModal(interaction as ModalSubmitInteraction);
    }
    return;
  }

  if (interaction.isButton()) {
    const customId = interaction.customId;

    if (customId === "open_ticket") {
      await handleOpenTicket(interaction);
    } else if (customId === "close_ticket") {
      await handleCloseTicket(interaction);
    } else if (customId === "suggest_open") {
      await handleSuggestOpen(interaction);
    } else if (customId.startsWith("suggest_favor:")) {
      const msgId = customId.split(":")[1];
      await handleSuggestVote(interaction, "favor", msgId);
    } else if (customId.startsWith("suggest_contra:")) {
      const msgId = customId.split(":")[1];
      await handleSuggestVote(interaction, "contra", msgId);
    } else if (customId.startsWith("suggest_approve:")) {
      const msgId = customId.split(":")[1];
      await handleSuggestStaff(interaction, "approve", msgId);
    } else if (customId.startsWith("suggest_reject:")) {
      const msgId = customId.split(":")[1];
      await handleSuggestStaff(interaction, "reject", msgId);
    }
  }
}
