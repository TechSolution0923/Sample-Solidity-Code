"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bip39_1 = __importDefault(require("bip39"));
var ed25519_hd_key_1 = require("ed25519-hd-key");
var loom_js_1 = require("loom-js");
var TruffleLoomProvider = /** @class */ (function () {
    /**
     * Constructs a new TruffleLoomProvider using LoomProvider to provide connection to Loom DAppChain.
     * @param chainId DAppChain identifier.
     * @param writeUrl Host & port to send txs, specified as "<protocol>://<host>:<port>".
     * @param readUrl Host & port of the DAppChain read/query interface, this should only be provided
     *                if it's not the same as `writeUrl`.
     * @param privateKey Account private key in Base64 string format
     */
    function TruffleLoomProvider(chainId, writeUrl, readUrl, privateKey) {
        var _privateKey = loom_js_1.CryptoUtils.B64ToUint8Array(privateKey);
        var writer = loom_js_1.createJSONRPCClient({ protocols: [{ url: writeUrl }] });
        var reader = loom_js_1.createJSONRPCClient({ protocols: [{ url: readUrl }] });
        var client = new loom_js_1.Client(chainId, writer, reader);
        this._engine = new loom_js_1.LoomProvider(client, _privateKey);
        this._engine.on('error', function (err) {
            console.error('Error detected within Truffle process:', err);
        });
    }
    /**
     * Returns provider engine (LoomProvider)
     *
     * @returns Returns the LoomProvider
     */
    TruffleLoomProvider.prototype.getProviderEngine = function () {
        return this._engine;
    };
    /**
     * Create extra accounts using a BIP-39 mnemonic.
     *
     * This function is useful for creating additional accounts for Truffle tests.
     *
     * @param mnemonic BIP-39 mnemonic.
     * @param quantity Number of accounts to create.
     */
    TruffleLoomProvider.prototype.createExtraAccountsFromMnemonic = function (mnemonic, quantity) {
        var seed = bip39_1.default.mnemonicToSeedHex(mnemonic);
        var privateKeys = Array.from(Array(quantity).keys()).map(function (index) {
            var data = ed25519_hd_key_1.derivePath("m/44'/148'/" + index + "'", seed);
            return loom_js_1.CryptoUtils.generatePrivateKeyFromSeed(data.key);
        });
        this._engine.addAccounts(privateKeys);
    };
    /**
     * Create extra accounts
     *
     * Useful for create new accounts to running tests on Truffle
     *
     * @param quantity How many accounts to be created
     */
    TruffleLoomProvider.prototype.createExtraAccounts = function (quantity) {
        var privateKeys = Array.from(Array(quantity).keys()).map(function () {
            return loom_js_1.CryptoUtils.generatePrivateKey();
        });
        this._engine.addAccounts(privateKeys);
    };
    /**
     * Send async calls to LoomProvider
     *
     * @param payload RPC call from Truffle
     * @param callback Callback function (err, value) => ()
     */
    TruffleLoomProvider.prototype.sendAsync = function (payload, callback) {
        this._engine.sendAsync(payload, callback);
    };
    /**
     * Same from sendAsync
     */
    TruffleLoomProvider.prototype.send = function (payload, callback) {
        return this._engine.send(payload, callback);
    };
    return TruffleLoomProvider;
}());
module.exports = TruffleLoomProvider;
//# sourceMappingURL=index.js.map