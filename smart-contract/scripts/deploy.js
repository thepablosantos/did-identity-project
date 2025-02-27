const hre = require("hardhat");

async function main() {
  const ERC725Identity = await hre.ethers.getContractFactory("ERC725Identity");
  const erc725Identity = await ERC725Identity.deploy();

  // Espera o deploy ser confirmado
  await erc725Identity.waitForDeployment();

  // Para obter o endereço do contrato em ethers v6:
  const contractAddress = await erc725Identity.getAddress();
  console.log("ERC725Identity deployado em:", contractAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });