const { ethers } = require("hardhat")
const { assert, expect } = require("chai")

describe("SimpleStorage", () => {
  let txnFactory, contract
  beforeEach(async () => {
    txnFactory = await ethers.getContractFactory("SimpleStorage")
    contract = await txnFactory.deploy()
  })

  it("Should start with a favourite number of 0", async () => {
    const currValue = await contract.retrieve()
    const expectedValue = "0"
    assert.equal(currValue.toString(), expectedValue)
    //expect(currValue.toString()).to.equal(expectedValue)
  })

  it("Should update when we call store", async () => {
    const expectedValue = "7"
    const txnres = await contract.store(expectedValue)
    await txnres.wait(1)

    const currValue = await contract.retrieve()
    assert.equal(currValue.toString(), expectedValue)
  })
})
