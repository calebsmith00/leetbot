import { generateID, getModTeamMembers } from "./utils.js";
import { client, guildID } from "./index.js";

export async function handleTicket({ interaction, message }) {
  const ticketID = generateID();

  const modTeamMembers = await getModTeamMembers();
  const availableMods = [];

  // Retrieves all online members of role "Mod Team" and adds them to the list of available mods
  modTeamMembers.forEach((member) => {
    if (member.presence === null || member.presence.status !== "online") return;
    availableMods.push(member.user);
  });

  // Selects a random index so the bot knows which mod to mention
  const modSelector = Math.floor(Math.random() * availableMods.length);
  const selectedModID = availableMods[modSelector].id;

  const supportChannel = client.channels.cache.get("1018264712997244948");

  console.log(interaction.member);
  await supportChannel.send(
    `<@${selectedModID}>, ${interaction.member.user.username} needs your assistance with Ticket #${ticketID}. Here are some details: \`\`\`${message}\`\`\``
  );

  // Let the user know that support is on their way!
  await interaction.reply(
    `Ticket #${ticketID} has been created. Please wait for a staff member to help you!`
  );
}
