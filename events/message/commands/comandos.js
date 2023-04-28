const api = require("../../../services/api");
async function getCommands() {
  try {
    const commands = await api.get("/commands/get");
    return commands;
  } catch (error) {
    console.error(error);
  }
}
module.exports = async (msg) => {
  const { data } = await getCommands();
  const commandsList = await data.commands.map((ObjCommand) => {
    if (ObjCommand.audioYt && ObjCommand.audioYt.length > 0) {
      return ` !${ObjCommand.command} 🔊️`;
    }
    if (ObjCommand.image && ObjCommand.image.length > 0) {
      return ` !${ObjCommand.command} 📸️`;
    }
    return ` !${ObjCommand.command} 🗒️`;
  });
  // count characters limit up to 2000
  const message = `${data.Total} comandos ${commandsList}.`;
  const maxCharacters = 2000;
  const messageChuncks = message.match(
    new RegExp(`.{1,${maxCharacters}}`, "g")
  );
  for (chunk of messageChuncks) {
    await msg.channel.send({ content: chunk });
  }
};
