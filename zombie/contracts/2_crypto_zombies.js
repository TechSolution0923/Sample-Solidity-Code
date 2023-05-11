var CryptoZombies = artifacts.requrie('./CryptoZombies.sol');

module.exports = function (deployer) {
    deployer.deploy(CryptoZombies);
}