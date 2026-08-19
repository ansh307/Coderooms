const crypto = require("crypto");

const generateInviteCode = () => {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  let code = "";

  for (let i = 0; i < 8; i++) {
    code += characters[crypto.randomInt(0, characters.length)];
  }

  return code;
};

const generateUniqueInviteCode = async (session) => {
  while (true) {
    const code = generateInviteCode();

    const existingRoom = await Room.findOne({
      inviteCode: code,
    }).session(session);

    if (!existingRoom) {
      return code;
    }
  }
};


module.exports = {
    generateInviteCode,
    generateUniqueInviteCode
};