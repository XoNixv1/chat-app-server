const bcrypt = require("bcryptjs");

const IsValidPass = async (passTocheck, correctPass) => {
  return await bcrypt.compare(passTocheck, correctPass);
};

module.exports = { IsValidPass };
