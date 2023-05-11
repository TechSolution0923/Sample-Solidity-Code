var ZombieOwnershipContract = artifacts.require("./ZombieOwnershipContract.sol");

module.exports = function(deployer) {
  deployer.deploy(ZombieOwnershipContract);
};
