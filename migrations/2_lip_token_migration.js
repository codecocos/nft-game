const MinToken = artifacts.require("MinToken");

module.exports = function (deployer) {
  deployer.deploy(MinToken, "MinToken", "MINS");
};
