const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const { abi, evm } = require('./compile')
const { MNEMONIC, INFURA_URL } = require('./environment')

// deploy code will go here
const provider = new HDWalletProvider(
    MNEMONIC,
    INFURA_URL
)

const web3 = new Web3(provider)

const deploy = async () => {
    const accounts = await web3.eth.getAccounts()

    console.log("Attempting to deploy from account", accounts[0]);

    const inbox = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ['Hi there!']})
    .send({ gas: '1000000', from: accounts[0]})

    console.log(`Contract deployed to: ${inbox.options.address}`);
    provider.engine.stop();
}
deploy();