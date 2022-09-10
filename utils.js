import { client, guildID } from "./index.js";

function generateID() {
  const id = Math.floor(Math.random() * 100000000);
  return id;
}

async function getModTeamMembers() {
  const guild = client.guilds.cache.get(guildID);
  await guild.members.fetch();

  const roles = await guild.roles.fetch();
  const modTeamRole = roles.find(
    (role) => role.name.toLowerCase() === "mod team"
  );

  return modTeamRole.members;
}

export { generateID, getModTeamMembers };
