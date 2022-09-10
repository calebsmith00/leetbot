import { client, guildID } from "./index.js";

function generateID() {
  const id = Math.floor(Math.random() * 1000000000);
  return id;
}

async function getModTeamMembers() {
  const guild = client.guilds.cache.get(guildID); // Guild ID references LeetRun420
  await guild.members.fetch(); // Fetch the latest GuildMembers

  const roles = await guild.roles.fetch(); // Fetch the latest roles
  const modTeamRole = roles.find(
    (role) => role.name.toLowerCase() === "mod team"
  );

  return modTeamRole.members;
}

export { generateID, getModTeamMembers };
