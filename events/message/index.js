const fs = require("fs");
const path = require("path");
const api = require("../../services/api");
const audioPlayer = require("./audioPlayer");
let commandsList = {};

const getAllCommandsAPI = async () => {
  try {
    const response = await api.get("/commands/get");
    return response.data.commands;
  } catch (error) {
    console.error(error);
    return;
  }
};

const dir = path.join(__dirname, "/commands/");

const files = fs.readdirSync(dir);
for (let file of files) {
  if (file.endsWith(".js")) {
    console.log(file);
    let command = file.split(".")[0];
    commandsList[command] = require(dir + command);
  }
}
module.exports = async (msg) => {
  let command = msg.content.split(" ");
  if (command[0].startsWith("!")) {
    command = command[0].substring(1);

    if (commandsList.hasOwnProperty(command)) {
      return await commandsList[command](msg);
    }
    if (command.startsWith("lind")) {
      return await commandsList["lind"](msg);
    } else {
      const APIcommands = await getAllCommandsAPI();
      const [seletedCommand] = APIcommands.filter(
        (item) => item.command === command
      );
      if (seletedCommand) {
        // return through voice channel
        if (seletedCommand.audioYt) {
          try {
            audioPlayer(msg, seletedCommand.audioYt);
          } catch (error) {
            console.log(error);
          }
        } else {
          // return through text channel
          msg.channel.send({
            content: seletedCommand.cmdReturn,
            files: seletedCommand.image ? [seletedCommand.image] : [],
          });
        }
      }
      return;
    }
  }
};
