const { task } = require("hardhat/config")

task(
  "block-number",
  "Prints the current block number",
  async (taskArgs, hre) => {
    const blockNum = await hre.ethers.provider.getBlockNumber()
    console.log(`Block Number = ${blockNum}`)
  }
)

module.exports = {}
