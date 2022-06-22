const ethers = require("ethers")
const fs = require("fs-extra")
require("dotenv").config()

async function main() {
    //end point ganache -> HTTP://127.0.0.1:8545

    //Making a provider ->
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)

    //Attaching a wallet ->
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

    //Encrypted Method ->
    //   const encryptedJson = fs.readFileSync("./encryptedKey.json", "utf8");
    //   let wallet = new ethers.Wallet.fromEncryptedJsonSync(
    //     encryptedJson,
    //     process.env.PRIVATE_KEY_PASSWORD
    //   );
    //   wallet = await wallet.connect(provider);

    //Reading the ABI and Binary ->
    const abi = fs.readFileSync("./Simplestorage_sol_SimpleStorage.abi", "utf8")
    const binary = fs.readFileSync(
        "./Simplestorage_sol_SimpleStorage.bin",
        "utf8"
    )

    //Making a contract factory ->
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)

    //Deploying ->
    console.log("Waiting for deployment ... :/")
    const contract = await contractFactory.deploy()
    //   console.log(contract);
    const deploymentData = await contract.deployTransaction.wait(1)
    console.log(deploymentData)

    //Interacting with contract
    const favNumber = await contract.retrieve()
    console.log(`Current fav number: ${favNumber.toString()}`)
    const t = await contract.store("69")
    const tr = await t.wait(1)
    const updatedNumber = await contract.retrieve()
    console.log(`Update fav number : ${updatedNumber.toString()}`)
}

main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
