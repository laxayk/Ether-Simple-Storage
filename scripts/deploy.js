const { ethers, run, network } = require("hardhat")
// const fs = require("fs-extra")
require("dotenv").config()

async function main() {
  //Creating dactory ->
  const txnFactory = await ethers.getContractFactory("SimpleStorage")

  //Deploying
  console.log("Deploying ....")
  const contract = await txnFactory.deploy()
  await contract.deployed()
  console.log(`Deployed-> ${contract.address}`)

  //Verifying the contract on etherscan ->
  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    await contract.deployTransaction.wait(6)
    await verify(contract.address, [])
  }

  //Interacting ->
  const currValue = await contract.retrieve()
  console.log(`Current value = ${currValue}`)

  const txn = await contract.store(69)
  await txn.wait(1)
  const newValue = await contract.retrieve()
  console.log(`New value = ${newValue}`)
}

async function verify(_contractAddress, _args) {
  console.log("Verifying contract...")
  try {
    await run("verify:verify", {
      address: _contractAddress,
      constructorArguments: _args,
    })
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified")
    } else {
      console.log(e)
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
