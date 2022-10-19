require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("./tasks/block-number")
require("./tasks/accounts")
require("hardhat-gas-reporter")
require("solidity-coverage")

const GOERLI_RPC_URL =
    process.env.GOERLI_RPC_URL ||
    "https://eth-goerli.g.alchemy.com/v2/kSi2Cik6bqBVH1YPTNNpxNNFvXhxFgBq"
const PRIVATE_KEY = process.env.PRIVATE_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
            blockConfirmations: 6
        },
        hardhat: {
            chainId: 31337
            // gasPrice: 130000000000,
        }
    },
    // solidity: "0.8.8"
    solidity: {
        compilers: [{ version: "0.8.8" }, { version: "0.6.6" }]
    },

    namedAccounts: {
        deployer: {
            default: 0 // the zero with the account
            //5: 1 // on goerli we want with the first position
        }
        //     user: {
        //         default: 1
        //     }
    },
    gasReporter: {
        enabled: true,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        coinmarketcap: COINMARKETCAP_API_KEY,
        token: "ETH"
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY
    },
    paths: {
        tests: "./test/unit"
    }
    //     paths: {
    //         test: "./test/unit"
    //     }
}
