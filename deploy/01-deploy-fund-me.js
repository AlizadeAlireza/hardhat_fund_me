// in this script we define how to deploy the fundme contract.

// import
// main function
// calling of main function

// function deployFunc(hre) {
//     console.log("hi")
// }

// module.exports.default = deployFunc

// module.exports = async (hre) => {
//     const {getNameAccounts, deployments} = hre
// hre.getNameAccounts
// hre.deployments

const {
    networkConfig,
    developmentChains
} = require("../helper-hardhat-config.js")
const { network } = require("hardhat")
const { verify } = require("../utils/verify")
// const helperConfig = require("../helper-hardhat-config.js")
// const networkConfig = helperConfig.networkConfig

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    let ethUsdPriceFeedAddress

    if (developmentChains.includes(network.name)) {
        // most recent
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }
    // if the contract doesn't exist, we deploy a minimal version of it
    // for our local testing

    // when going for localhost ot hardhat network we want to use a mock
    const args = [ethUsdPriceFeedAddress]
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args, // put priceFeed address
        log: true,
        waitConfirmatinos: network.config.blockConfirmations || 1
    })

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        // verify(contractAddress, args)
        await verify(fundMe.address, args)
    }
    log("------------------------------------")
}

module.exports.tags = ["all", "fundme"]
