// chainId
const networkConfig = {
    // goerli
    5: {
        name: "goerli",
        ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e"
    },
    // polygon
    31337: {
        name: "localhost"
    }
    // Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
}

const developmentChains = ["hardhat", "localhost"]
const DECIMALS = 8
const INITIAL_ANSWER = 200000000000

module.exports = {
    networkConfig,
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER
}
